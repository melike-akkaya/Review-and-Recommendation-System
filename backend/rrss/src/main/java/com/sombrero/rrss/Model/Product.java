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
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "style")
    private String style;
    @Column(name = "image_paths")
    private String imagePaths;
    @Column(name = "category")
    private String category;
    @Column(name = "price")
    private double price;
    @Column(name = "merchant_id")
    private int merchantId;
}
