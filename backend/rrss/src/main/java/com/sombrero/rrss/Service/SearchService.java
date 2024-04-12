package com.sombrero.rrss.Service;

import com.sombrero.rrss.Model.Merchant;
import com.sombrero.rrss.Repository.IMerchantRepository;
import com.sombrero.rrss.Model.User;
import com.sombrero.rrss.Repository.IUserRepository;
import com.sombrero.rrss.Model.Product;
import com.sombrero.rrss.Repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    @Autowired
    private IMerchantRepository merchantRepository;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IProductRepository productRepository;

    public List<User> searchUsers(String query) {
        return userRepository.findByNameIgnoreCaseContaining(query);
    }

    public List<Product> searchProducts(String query) {
        return productRepository.findByNameIgnoreCaseContaining(query);
    }

    public List<Merchant> searchMerchants(String query) {
        return merchantRepository.findByNameIgnoreCaseContaining(query);
    }
}
