package com.sombrero.rrss.Controller;

import com.sombrero.rrss.Model.Temp;
import com.sombrero.rrss.Service.TempService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/temp")
public class TempController {

    private final TempService tempService;

    @GetMapping("/")
    public Temp getTemp() {
        return tempService.getById(1).orElse(null);
    }

    @PostMapping("/setTrue")
    public ResponseEntity<Temp> setTrue() {
        try {
            Optional<Temp> tempOptional = tempService.getById(1);
            if (tempOptional.isPresent()) {
                Temp temp = tempOptional.get();
                temp.setIsEditable(1);
                tempService.save(temp);

                return new ResponseEntity<>(temp, HttpStatus.OK);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/setFalse")
    public ResponseEntity<Temp> setFalse() {
        try {
            Optional<Temp> tempOptional = tempService.getById(1);
            if (tempOptional.isPresent()) {
                Temp temp = tempOptional.get();
                temp.setIsEditable(0);
                tempService.save(temp);

                return new ResponseEntity<>(temp, HttpStatus.OK);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
