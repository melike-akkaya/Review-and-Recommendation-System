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
        String[] words = merchant.getCountry().split("[-\\s]"); // split the country name by "-" or " "

        StringBuilder capitalizedCountry = new StringBuilder();

        for (int i = 0; i < words.length; i++) {
            String word = words[i];
            if (word.equalsIgnoreCase("and") || word.equalsIgnoreCase("of")) {
                capitalizedCountry.append(word.toLowerCase());
            } else {
                capitalizedCountry.append(Character.toUpperCase(word.charAt(0))).append(word.substring(1).toLowerCase());
            }

            if (i < words.length - 1) {
                capitalizedCountry.append(" ");
            }
        }

        merchant.setCountry(capitalizedCountry.toString());

        return merchantRepository.save(merchant);
    }


    public Optional<Merchant> getById(int id) {
        return merchantRepository.findById(id);
    }
}
