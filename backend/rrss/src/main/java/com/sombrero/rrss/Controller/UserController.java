package com.sombrero.rrss.Controller;

import com.sombrero.rrss.Model.User;
import com.sombrero.rrss.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

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
}
