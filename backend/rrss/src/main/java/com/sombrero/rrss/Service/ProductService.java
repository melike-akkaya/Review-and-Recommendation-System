package com.sombrero.rrss.Service;

import com.sombrero.rrss.Model.Product;
import com.sombrero.rrss.Repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    //Add new product to the database
    private final IProductRepository productRepository;

    @Autowired
    public ProductService(IProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Integer getLastProductId() {
        return productRepository.findMaxProductId();
    }

    public void addProduct(Product product) {
        productRepository.save(product);
    }

    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }

    //Get all
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public List<Product> getByMerchantId(Integer merchantId) {
        List<Product> products = getAll();
        List<Product> merchantProducts = new java.util.ArrayList<>();
        for (int i = 0; i < products.size(); i++) {
            if (products.get(i).getUser() == merchantId) {
                merchantProducts.add(products.get(i));
            }
        }
        return merchantProducts;
    }
    public Optional<Product> getProductById(Integer productId) {
        return productRepository.findById(productId);
    }

    public void updateProduct(Integer productId, Product product) {
        //Find the product
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isPresent()) {
            Product productToUpdate = productOptional.get();
            productToUpdate.setName(product.getName());
            productToUpdate.setPrice(product.getPrice());
            productToUpdate.setCategory(product.getCategory());
            productToUpdate.setUser(product.getUser());
            productToUpdate.setDescription(product.getDescription());
            productToUpdate.setImage(product.getImage());
            productRepository.save(productToUpdate);
        }
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }


    public Optional<Product> getById(int id) {
        return productRepository.findById(id);
    }

    public List<Product> getByCategory(Integer category) { return productRepository.findByCategory(category); }
}
