package com.sombrero.rrss.Service;

import com.sombrero.rrss.Model.User;
import com.sombrero.rrss.Repository.IMerchantRepository;
import com.sombrero.rrss.Repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class MerchantService {

    //private final IMerchantRepository merchantRepository;
    private final IUserRepository userRepository;
    @Autowired
    public MerchantService(IMerchantRepository merchantRepository, IUserRepository userRepository) {
        //this.merchantRepository = merchantRepository;
        this.userRepository = userRepository;
    }

    public User save(User user) {
        String[] words = user.getCountry().split("[-\\s]"); // split the country name by "-" or " "

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

        user.setCountry(capitalizedCountry.toString());

        return userRepository.save(user);
    }


    public Optional<User> getById(int id) {return userRepository.findById(id); }
}
