package com.sombrero.rrss.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "label")
public class Label {
    @Id
    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "elegant")
    private String elegant;

    @Column(name = "luxury")
    private double luxury;

    @Column(name = "ergonomic")
    private int ergonomic;

    @Column(name = "antique")
    private int antique;

    @Column(name = "modern")
    private int modern;
}
