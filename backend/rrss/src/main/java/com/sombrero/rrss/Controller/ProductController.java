package com.sombrero.rrss.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sombrero.rrss.Model.Product;
import com.sombrero.rrss.Service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


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
}