
package com.sombrero.rrss.Repository;

import com.sombrero.rrss.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByNameIgnoreCaseContaining(String name);

    @Query(value = "SELECT MAX(productId) FROM Product")
    Integer findMaxProductId();

    List<Product> findByCategory(int category);
}
