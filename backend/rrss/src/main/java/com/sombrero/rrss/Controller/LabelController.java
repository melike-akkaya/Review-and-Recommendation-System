package com.sombrero.rrss.Controller;

import com.sombrero.rrss.Model.Label;
import com.sombrero.rrss.Model.Product;
import com.sombrero.rrss.Service.LabelService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/labels")
public class LabelController {
    private final LabelService labelService;
    @GetMapping("/{productId}")
    public ResponseEntity<List<Label>> getLabels(@PathVariable Integer productId) {
        List<Label> labels = labelService.getByProductId(productId);
        if (labels.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(labels, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Label> addLabel(@RequestBody Label newLabel) {
        try {
            labelService.addLabel(newLabel);
            return new ResponseEntity<>(newLabel, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<Product> deleteLabel(@PathVariable Integer productId) {
        labelService.deleteProduct(productId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
