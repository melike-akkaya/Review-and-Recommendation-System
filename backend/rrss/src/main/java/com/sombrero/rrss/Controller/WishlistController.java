package com.sombrero.rrss.Controller;

import com.sombrero.rrss.Model.Product;
import com.sombrero.rrss.Model.Wishlist;
import com.sombrero.rrss.Service.ProductService;
import com.sombrero.rrss.Service.WishlistService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/wishlists")
public class WishlistController {
    private final WishlistService wishlistService;
    private final ProductService productService;

    @GetMapping("/")
    public ResponseEntity<List<Wishlist>> getAllWishlists() {
        List<Wishlist> wishlists = wishlistService.getAll();
        return new ResponseEntity<>(wishlists, HttpStatus.OK);
    }

    @GetMapping("/{wishlistId}")
    public ResponseEntity<Wishlist> getWishlistById(@PathVariable Integer wishlistId) {
        Optional<Wishlist> wishlist = wishlistService.getById(wishlistId);
        return wishlist.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Wishlist> addWishlist(@RequestBody Wishlist wishlist) {
        Wishlist newWishlist = wishlistService.save(wishlist);
        return new ResponseEntity<>(newWishlist, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{wishlistId}")
    public ResponseEntity<?> deleteWishlist(@PathVariable Integer wishlistId) {
        wishlistService.delete(wishlistId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{wishlistId}/addProduct/{productId}")
    public ResponseEntity<Wishlist> addProductToWishlist(@PathVariable Integer wishlistId,
                                                         @PathVariable Integer productId) {
        Product product = productService.getById(productId).orElse(null);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        Wishlist updatedWishlist = wishlistService.addProductToWishlist(wishlistId, product);
        if (updatedWishlist != null) {
            return ResponseEntity.ok(updatedWishlist);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{wishlistId}/removeProduct/{productId}")
    public ResponseEntity<Wishlist> removeProductFromWishlist(@PathVariable Integer wishlistId,
                                                              @PathVariable Integer productId) {
        Product product = productService.getById(productId).orElse(null);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        Wishlist updatedWishlist = wishlistService.removeProductFromWishlist(wishlistId, product);
        if (updatedWishlist != null) {
            return ResponseEntity.ok(updatedWishlist);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{wishlistId}/updateName")
    public ResponseEntity<Wishlist> updateWishlistName(@PathVariable Integer wishlistId,
                                                       @RequestParam String newName) {
        Wishlist updatedWishlist = wishlistService.updateWishlistName(wishlistId, newName);
        if (updatedWishlist != null) {
            return ResponseEntity.ok(updatedWishlist);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
