package com.sombrero.rrss.Controller;

import com.sombrero.rrss.Model.Merchant;
import com.sombrero.rrss.Service.MerchantService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/merchant")
public class MerchantController {

    private final MerchantService merchantService;

    @GetMapping("/{merchantId}")
    public ResponseEntity<Merchant> getMerchantInfo(@PathVariable Integer merchantId) {
        Optional<Merchant> optionalMerchant = merchantService.getById(merchantId);

        // return the merchant if found and 404 if merchant not found
        return optionalMerchant.map(merchant -> new ResponseEntity<>(merchant, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/edit/{merchantId}")
    public ResponseEntity<Merchant> editMerchantInfo(@PathVariable Integer merchantId,
                                                     @RequestPart String name, @RequestPart byte [] image ) {
        try {
            Optional<Merchant> optionalMerchant = merchantService.getById(merchantId);

            if (optionalMerchant.isPresent()) { // if the merchant exists
                Merchant existingMerchant = optionalMerchant.get();

                existingMerchant.setName(name);

                if (image != null) {
                    existingMerchant.setImage(image);
                }

                Merchant updatedMerchant = merchantService.save(existingMerchant);

                return new ResponseEntity<>(updatedMerchant, HttpStatus.OK);
            } else { // if merchant not found
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/editAuthorizedPerson/{merchantId}")
    public ResponseEntity<Merchant> editAuthorizedPerson(@PathVariable Integer merchantId,
                                                         @RequestBody Merchant updatedMerchantInfo) {
        Optional<Merchant> optionalMerchant = merchantService.getById(merchantId);

        if (optionalMerchant.isPresent()) { // if the merchant exists
            Merchant existingMerchant = optionalMerchant.get();

            existingMerchant.setAuthorizedPersonName(updatedMerchantInfo.getAuthorizedPersonName());
            existingMerchant.setAuthorizedPersonSurname(updatedMerchantInfo.getAuthorizedPersonSurname());
            existingMerchant.setCountry(updatedMerchantInfo.getCountry());
            existingMerchant.setEmail(updatedMerchantInfo.getEmail());

            Merchant updatedMerchant = merchantService.save(existingMerchant);

            return new ResponseEntity<>(updatedMerchant, HttpStatus.OK);
        } else { // if merchant not found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
