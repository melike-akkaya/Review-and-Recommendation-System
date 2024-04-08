package com.sombrero.rrss.Service;

import com.sombrero.rrss.Model.Merchant;
import com.sombrero.rrss.Repository.IMerchantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MerchantService {

    private final IMerchantRepository merchantRepository;

    @Autowired
    public MerchantService(IMerchantRepository merchantRepository) {
        this.merchantRepository = merchantRepository;
    }

    public Merchant save(Merchant merchant) {
        String country = merchant.getCountry();
        // Check if country starts with lowercase
        if (country != null && !country.isEmpty() && Character.isLowerCase(country.charAt(0))) {
            // Capitalize the first letter
            country = Character.toUpperCase(country.charAt(0)) + country.substring(1);
            merchant.setCountry(country);
        }
        // Save the modified merchant
        return merchantRepository.save(merchant);
    }

    public Optional<Merchant> getById(int id) {
        return merchantRepository.findById(id);
    }
}
