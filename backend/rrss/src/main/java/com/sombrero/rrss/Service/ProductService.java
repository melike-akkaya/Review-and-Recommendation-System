package com.sombrero.rrss.Service;

import com.sombrero.rrss.Model.Product;
import com.sombrero.rrss.Repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    //Add new product to the database
    private final IProductRepository productRepository;

    @Autowired
    public ProductService(IProductRepository productRepository) {
        this.productRepository = productRepository;
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
            if (products.get(i).getMerchantId() == merchantId) {
                merchantProducts.add(products.get(i));
            }
        }
        return merchantProducts;
    }
}
