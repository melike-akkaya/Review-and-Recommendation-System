package com.sombrero.rrss.Controller;

import com.sombrero.rrss.Model.Merchant;
import com.sombrero.rrss.Model.User;
import com.sombrero.rrss.Service.MerchantService;
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

    @GetMapping("/{email}")
    public ResponseEntity<User> getUser(@PathVariable String email) {
        Optional<User> optionalUser = userService.getByEmail(email);

        // return the user if found and 404 if merchant not found
        return optionalUser.map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
