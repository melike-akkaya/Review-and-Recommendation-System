package com.sombrero.rrss.Repository;

import com.sombrero.rrss.Model.Label;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ILabelRepository extends JpaRepository<Label, Integer> {
    List<Label> findByProductId(int id);

}
