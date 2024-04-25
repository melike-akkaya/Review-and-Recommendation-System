package com.sombrero.rrss.Service;

import com.sombrero.rrss.Model.Review;
import com.sombrero.rrss.Repository.IReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReviewService {

    private final IReviewRepository reviewRepository;

    @Autowired
    public ReviewService(IReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    public Optional<Review> getById(int id) {
        return reviewRepository.findById(id);
    }

    public Review update(Review updatedReview) {
        return reviewRepository.save(updatedReview);
    }

    public void deleteById(int id) {
        reviewRepository.deleteById(id);
    }
}