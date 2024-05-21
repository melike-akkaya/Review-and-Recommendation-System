package com.sombrero.rrss.Service;

import com.sombrero.rrss.Model.Product;
import com.sombrero.rrss.Model.User;
import com.sombrero.rrss.Repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private IUserRepository userRepository;

    @Autowired
    public UserService(IUserRepository userRepository) { this.userRepository = userRepository;}

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public Optional<User> loadUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
