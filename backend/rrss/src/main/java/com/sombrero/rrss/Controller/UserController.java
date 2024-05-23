package com.sombrero.rrss.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sombrero.rrss.Model.Merchant;
import com.sombrero.rrss.Model.User;
import com.sombrero.rrss.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAll();

        // return the list of users
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUser(@PathVariable String email) {
        Optional<User> optionalUser = userService.getByEmail(email);

        // return the user if found and 404 if merchant not found
        return optionalUser.map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestParam("user") String userJson, @RequestPart byte [] image) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            User user = objectMapper.readValue(userJson, User.class);

            if (image != null) {
                user.setImage(image);
            }
            userService.addUser(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error processing user: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/{user_id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer user_id) {
        try {
            Optional<User> user = userService.loadUserById(user_id);
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error retrieving user: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/update/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Integer userId, @RequestParam("user") String userJson, @RequestPart byte [] image) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            User user = objectMapper.readValue(userJson, User.class);

            if (image != null) {
                user.setImage(image);
            }

            Optional<User> updatedUser = userService.updateUser(userId, user);
            return updatedUser.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            System.out.println("Error updating user: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/name/{user_id}")
    public ResponseEntity<String> getUserNameById(@PathVariable Integer user_id) {
        try {
            Optional<User> user = userService.loadUserById(user_id);
            return new ResponseEntity<>(user.get().getName()+" "+user.get().getSurname(), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Error retrieving user: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
