package com.sombrero.rrss.Service;

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

    public Optional<User> getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void addUser(User user) {
        userRepository.save(user);
    }

    public Optional<User> updateUser(Integer userId, User user) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setName(user.getName());
            existingUser.setSurname(user.getSurname());
            existingUser.setCountry(user.getCountry());
            existingUser.setEmail(user.getEmail());
            existingUser.setImage(user.getImage());
            existingUser.setRole(user.getRole());
            userRepository.save(existingUser);
            return Optional.of(existingUser);
        } else {
            return Optional.empty();
        }
    }

    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }

}
