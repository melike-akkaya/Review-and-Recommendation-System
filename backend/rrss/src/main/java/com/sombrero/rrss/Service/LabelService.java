package com.sombrero.rrss.Service;


import com.sombrero.rrss.Model.Label;
import com.sombrero.rrss.Repository.ILabelRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class LabelService {
    private final ILabelRepository labelRepository;

    public LabelService(ILabelRepository labelRepository) {
        this.labelRepository = labelRepository;
    }

    public void addLabel(Label label) {
        labelRepository.save(label);
    }
    public List<Label> getByProductId(int id) {
        return labelRepository.findByProductId(id);
    }

    public void deleteProduct(int id) {
        labelRepository.deleteById(id);
    }

    public Label save(Label label) {
        return labelRepository.save(label);
    }

    public Optional<Label> getById(int id) {
        return labelRepository.findById(id);
    }
}
