package com.sombrero.rrss.Repository;

import com.sombrero.rrss.Model.Merchant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IMerchantRepository extends JpaRepository<Merchant, Integer> {
    List<Merchant> findByNameIgnoreCaseContaining(String name);
}
