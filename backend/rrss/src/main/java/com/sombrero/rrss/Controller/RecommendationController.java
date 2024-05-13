package com.sombrero.rrss.Controller;

import com.sombrero.rrss.Model.Label;
import com.sombrero.rrss.Model.Product;
import com.sombrero.rrss.Model.Wishlist;
import com.sombrero.rrss.Service.LabelService;
import com.sombrero.rrss.Service.ProductService;
import com.sombrero.rrss.Service.UserService;
import com.sombrero.rrss.Service.WishlistService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/recommendations")
public class RecommendationController {

    private final LabelService labelService;
    private final WishlistService wishlistService;
    private final ProductService productService;


    @GetMapping("/{userId}")
    public ResponseEntity<List<Product>> getRecommendations(@PathVariable Integer userId) {
        ArrayList<Integer> hypothesis = new ArrayList<>();
        for (int i = 0; i < labelService.getLabelCount(); i++) {
            hypothesis.add(-1);
        }
        List<Wishlist> wishlists = wishlistService.getWishlistsByUserId(userId);
        List<Product> wishListedProducts = new ArrayList<>();
        for (Wishlist wishlist : wishlists) {
            wishListedProducts.addAll(wishlist.getProducts());
        }

        for (Product product : wishListedProducts) {
            List<Integer> labelValues = GetLabelsByProductId(product.getProductId());
            //Apply find S algorithm
            //1 for true 0 for false 2 for don't care, -1 for not set
            for (int i = 0; i < labelValues.size(); i++) {
                if (hypothesis.get(i) == -1) {
                    hypothesis.set(i, labelValues.get(i));
                } else if (hypothesis.get(i) != labelValues.get(i)) {
                    hypothesis.set(i, 2);
                }
            }
        }

        List<Product> recommendedProducts = new ArrayList<>();
        for (Product product : productService.getAll()) {
            List<Integer> labelValues = GetLabelsByProductId(product.getProductId());
            boolean isRecommended = true;
            for (int i = 0; i < labelValues.size(); i++) {
                if (hypothesis.get(i) != 2 && hypothesis.get(i) != labelValues.get(i)) {
                    isRecommended = false;
                    break;
                }
            }
            if (isRecommended) {
                recommendedProducts.add(product);
            }
        }
        //Remove the products that are already in the wishlist
        recommendedProducts.removeAll(wishListedProducts);
        return new ResponseEntity<>(recommendedProducts, HttpStatus.OK);
    }

    private List<Integer> GetLabelsByProductId(int productId) {
        List<Label> labels = labelService.getByProductId(productId);

        List<Integer> labelValues = new ArrayList<>();
        if (labels.size() == 0) {
            labelValues.add(0);
            labelValues.add(0);
            labelValues.add(0);
            labelValues.add(0);
            labelValues.add(0);
            return labelValues;
        }
        Label label = labels.get(0);
        labelValues.add(label.getElegant());
        labelValues.add(label.getErgonomic());
        labelValues.add(label.getModern());
        labelValues.add(label.getLuxury());
        labelValues.add(label.getAntique());
        return labelValues;
    }
}
