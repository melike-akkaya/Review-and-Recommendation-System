package com.sombrero.rrss.Service;

import com.sombrero.rrss.Model.Temp;
import com.sombrero.rrss.Repository.ITempRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TempService {

    private final ITempRepository tempRepository;

    @Autowired
    public TempService(ITempRepository tempRepository) {
        this.tempRepository = tempRepository;
    }

    public Temp save(Temp temp) {
        return tempRepository.save(temp);
    }

    public Optional<Temp> getById(int id) {
        return tempRepository.findById(id);
    }
}