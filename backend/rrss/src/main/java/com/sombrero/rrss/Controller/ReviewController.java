package com.sombrero.rrss.Controller;

import com.sombrero.rrss.Model.Review;
import com.sombrero.rrss.Service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        try {
            Review savedReview = reviewService.save(review);
            return new ResponseEntity<>(savedReview, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<Review> getReviewById(@PathVariable Integer reviewId) {
        Optional<Review> optionalReview = reviewService.getById(reviewId);
        return optionalReview.map(review -> new ResponseEntity<>(review, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/edit/{reviewId}")
    public ResponseEntity<Review> editReview(@PathVariable Integer reviewId,
                                             @RequestBody Map<String, Object> updates) {
        Optional<Review> existingReview = reviewService.getById(reviewId);
        if (existingReview.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (updates.containsKey("comment")) {
            existingReview.get().setComment((String) updates.get("comment"));
        }

        Review updated = reviewService.update(existingReview.orElse(null));
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Integer reviewId) {
        reviewService.deleteById(reviewId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/allReviews/{productId}")
    public ResponseEntity<Iterable<Review>> getReviewsByProductId(@PathVariable Integer productId) {
        Iterable<Review> reviewList = reviewService.getReviewsByProductId(productId);
        return new ResponseEntity<>(reviewList, HttpStatus.OK);
    }

}