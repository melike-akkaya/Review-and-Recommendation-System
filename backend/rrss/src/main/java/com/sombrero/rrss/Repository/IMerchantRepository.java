package com.sombrero.rrss.Repository;

import com.sombrero.rrss.Model.Merchant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMerchantRepository extends JpaRepository<Merchant, Integer> {
}
