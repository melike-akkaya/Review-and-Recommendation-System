package com.sombrero.rrss.Controller;

import com.sombrero.rrss.Model.Product;
import com.sombrero.rrss.Model.Merchant;
import com.sombrero.rrss.Model.User;
import com.sombrero.rrss.Service.SearchService;

import lombok.AllArgsConstructor;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/search")
public class SearchController {

    private SearchService searchService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> searchUsers(@RequestParam("query") String query) {
        List<User> userList = searchService.searchUsers(query);
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam("query") String query) {
        List<Product> productList = searchService.searchProducts(query);
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("/merchants")
    public ResponseEntity<List<Merchant>> searchMerchants(@RequestParam("query") String query) {
        List<Merchant> merchantList = searchService.searchMerchants(query);
        return new ResponseEntity<>(merchantList, HttpStatus.OK);
    }
}
