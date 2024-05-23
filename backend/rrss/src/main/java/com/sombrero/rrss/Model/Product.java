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
    private Integer productId;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private double price;

    @Column(name = "category_id")
    private Integer category;

    @Column(name = "merchant_id")
    private Integer user;

    @Column(name = "description")
    private String description;

    @Column(name = "image")
    @Lob
    private byte[] image;

    @Column(name = "view_count")
    private Integer viewCount=0;

    @Column(name = "averager_rating")
    private Integer averageRate=0;
}
