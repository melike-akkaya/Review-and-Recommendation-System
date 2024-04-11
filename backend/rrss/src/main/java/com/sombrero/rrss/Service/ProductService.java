package com.sombrero.rrss.Service;

import com.sombrero.rrss.Model.Product;
import com.sombrero.rrss.Repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private IProductRepository productRepository;

    @Autowired
    public ProductService(IProductRepository productRepository) { this.productRepository = productRepository;}

    public List<Product> getAll() {
        return productRepository.findAll();
    }
}
