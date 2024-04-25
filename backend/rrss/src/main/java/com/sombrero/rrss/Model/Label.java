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
    private Integer elegant;

    @Column(name = "luxury")
    private Integer luxury;

    @Column(name = "ergonomic")
    private Integer ergonomic;

    @Column(name = "antique")
    private Integer antique;

    @Column(name = "modern")
    private Integer modern;
}
