package com.sombrero.rrss.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sombrero.rrss.Model.Product;
import com.sombrero.rrss.Service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/")
    public ResponseEntity<Iterable<Product>> getAllProducts() {
        Iterable<Product> productList = productService.getAll();
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }
    //Get by merchant ID
    @GetMapping("/{merchantId}")
    public ResponseEntity<Iterable<Product>> getProductsByMerchantId(@PathVariable Integer merchantId) {
        Iterable<Product> productList = productService.getByMerchantId(merchantId);
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("/lastId")
    public ResponseEntity<Integer> getLastProductId() {
        try {
            Integer lastProductId = productService.getLastProductId();
            return new ResponseEntity<>(lastProductId, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error retrieving last product ID: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/last4Ids")
    public ResponseEntity<List<Product>> getLastFourProductIds() {
        try {
            List<Product> products = productService.getLastFourProducts();
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error retrieving last 4 product IDs: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestParam("product") String productJson, @RequestParam("image") MultipartFile imageFile) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Product product = objectMapper.readValue(productJson, Product.class);

            byte[] image = imageFile.getBytes();
            product.setImage(image);

            productService.addProduct(product);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error processing product: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<Product> deleteProduct(@PathVariable Integer productId) {
        productService.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/byProductId/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer productId) {
        Optional<Product> productOptional = productService.getProductById(productId);
        return productOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/update/{productId}")
    public ResponseEntity<Product> updateProductById(@PathVariable Integer productId,
                                                     @RequestPart String product, @RequestPart byte [] image ) {
        try {
            Optional<Product> optionalProduct = productService.getById(productId);

            if (optionalProduct.isPresent()) { // if the merchant exists
                Product existingProduct = optionalProduct.get();

                ObjectMapper objectMapper = new ObjectMapper();
                Product productObject = objectMapper.readValue(product, Product.class);

                existingProduct.setName(productObject.getName());
                existingProduct.setPrice(productObject.getPrice());
                existingProduct.setDescription(productObject.getDescription());

                if (image != null) {
                    existingProduct.setImage(image);
                }

                Product updatedProduct = productService.save(existingProduct);

                return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
            } else { // if merchant not found
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/incrementViewCount/{productId}")
    public ResponseEntity<Product> incrementViewCount(@PathVariable Integer productId) {
        Optional<Product> optionalProduct = productService.getById(productId);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setViewCount(product.getViewCount() + 1);
            productService.save(product);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getViewCount/{productId}")
    public ResponseEntity<Integer> getViewCount(@PathVariable Integer productId) {
        Optional<Product> optionalProduct = productService.getById(productId);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            return new ResponseEntity<>(product.getViewCount(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/byCategory/{category}")
    public ResponseEntity<Iterable<Product>> getProductsByCategory(@PathVariable Integer category) {
        Iterable<Product> productList = productService.getByCategory(category);
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }


}

