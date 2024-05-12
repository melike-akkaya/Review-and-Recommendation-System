package com.sombrero.rrss.Repository;

import com.sombrero.rrss.Model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IWishlistRepository extends JpaRepository<Wishlist, Integer> {
}
