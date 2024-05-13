package com.sombrero.rrss.Service;

import com.sombrero.rrss.Model.Product;
import com.sombrero.rrss.Model.Wishlist;
import com.sombrero.rrss.Repository.IWishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {
    private final IWishlistRepository wishlistRepository;

    @Autowired
    public WishlistService(IWishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    public List<Wishlist> getAll() {
        return wishlistRepository.findAll();
    }

    public Optional<Wishlist> getById(int id) {
        return wishlistRepository.findById(id);
    }

    public Wishlist save(Wishlist wishlist) {
        return wishlistRepository.save(wishlist);
    }

    public void delete(int id) {
        wishlistRepository.deleteById(id);
    }

    public Wishlist addProductToWishlist(int wishlistId, Product product) {
        Optional<Wishlist> optionalWishlist = wishlistRepository.findById(wishlistId);
        if (optionalWishlist.isPresent()) {
            Wishlist wishlist = optionalWishlist.get();
            wishlist.getProducts().add(product);
            return wishlistRepository.save(wishlist);
        }
        return null;
    }

    public Wishlist removeProductFromWishlist(int wishlistId, Product product) {
        Optional<Wishlist> optionalWishlist = wishlistRepository.findById(wishlistId);
        if (optionalWishlist.isPresent()) {
            Wishlist wishlist = optionalWishlist.get();
            wishlist.getProducts().remove(product);
            return wishlistRepository.save(wishlist);
        }
        return null;
    }

    public Wishlist updateWishlistName(Integer wishlistId, String newName) {
        Optional<Wishlist> optionalWishlist = wishlistRepository.findById(wishlistId);
        if (optionalWishlist.isPresent()) {
            Wishlist wishlist = optionalWishlist.get();
            wishlist.setName(newName);
            return wishlistRepository.save(wishlist);
        }
        return null;
    }

    public List<Wishlist> getWishlistsByUserId(int userId) {
        return wishlistRepository.findByUserId(userId);
    }

}
