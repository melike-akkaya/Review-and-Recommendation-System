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
        return merchantRepository.save(merchant);
    }

    public Optional<Merchant> getById(int id) {
        return merchantRepository.findById(id);
    }
}
