package com.sombrero.rrss.Controller;

import com.sombrero.rrss.Model.User;
import com.sombrero.rrss.Service.MerchantService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/merchant")
public class MerchantController {

    private final MerchantService merchantService;
    //private final UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<User> getMerchantInfo(@PathVariable Integer userId) {
        Optional<User> optionalUser = merchantService.getById(userId);
        System.out.println(optionalUser.isPresent());

        // return the merchant if found and 404 if merchant not found
        return optionalUser.map(merchant -> new ResponseEntity<>(merchant, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/edit/{userId}")
    public ResponseEntity<User> editMerchantInfo(@PathVariable Integer userId,
                                                     @RequestPart String name, @RequestPart byte [] image ) {
        try {
            Optional<User> optionalUser = merchantService.getById(userId);

            if (optionalUser.isPresent()) { // if the merchant exists
                User existingUser = optionalUser.get();

                existingUser.setMerchantName(name);

                if (image != null) {
                    existingUser.setImage(image);
                }

                User updatedUser = merchantService.save(existingUser);

                return new ResponseEntity<>(updatedUser, HttpStatus.OK);
            } else { // if merchant not found
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/editAuthorizedPerson/{userId}")
    public ResponseEntity<User> editAuthorizedPerson(@PathVariable Integer userId,
                                                         @RequestBody User updatedUserInfo) {
        Optional<User> optionalUser = merchantService.getById(userId);

        if (optionalUser.isPresent()) { // if the merchant exists
            User existingUser = optionalUser.get();

            existingUser.setName(updatedUserInfo.getName());
            existingUser.setSurname(updatedUserInfo.getSurname());
            existingUser.setCountry(updatedUserInfo.getCountry());
            existingUser.setEmail(updatedUserInfo.getEmail());

            User updatedUser = merchantService.save(existingUser);

            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } else { // if merchant not found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
