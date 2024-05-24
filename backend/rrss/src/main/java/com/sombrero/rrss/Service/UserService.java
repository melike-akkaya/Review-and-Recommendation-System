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

    public Optional<User> getById(int id) {return userRepository.findById(id); }

    public Optional<User> getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> loadUserById(Integer userId) {
        return userRepository.findById(userId);
    }
    public void addUser(User user) {

        String[] words = user.getCountry().split("[-\\s]"); // split the country name by "-" or " "

        StringBuilder capitalizedCountry = new StringBuilder();

        for (int i = 0; i < words.length; i++) {
            String word = words[i];
            if (word.equalsIgnoreCase("and") || word.equalsIgnoreCase("of")) {
                capitalizedCountry.append(word.toLowerCase());
            } else {
                capitalizedCountry.append(Character.toUpperCase(word.charAt(0))).append(word.substring(1).toLowerCase());
            }

            if (i < words.length - 1) {
                capitalizedCountry.append(" ");
            }
        }

        user.setCountry(capitalizedCountry.toString());

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

            String[] words = user.getCountry().split("[-\\s]"); // split the country name by "-" or " "

            StringBuilder capitalizedCountry = new StringBuilder();

            for (int i = 0; i < words.length; i++) {
                String word = words[i];
                if (word.equalsIgnoreCase("and") || word.equalsIgnoreCase("of")) {
                    capitalizedCountry.append(word.toLowerCase());
                } else {
                    capitalizedCountry.append(Character.toUpperCase(word.charAt(0))).append(word.substring(1).toLowerCase());
                }

                if (i < words.length - 1) {
                    capitalizedCountry.append(" ");
                }
            }

            existingUser.setCountry(capitalizedCountry.toString());

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
