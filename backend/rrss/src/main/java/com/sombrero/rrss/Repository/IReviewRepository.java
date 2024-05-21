package com.sombrero.rrss.Repository;

import com.sombrero.rrss.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findAllByProductId(Integer productId);
}