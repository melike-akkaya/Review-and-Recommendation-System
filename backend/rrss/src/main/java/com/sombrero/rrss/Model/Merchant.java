package com.sombrero.rrss.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "merchant")
public class Merchant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "authorized_person_name")
    private String authorizedPersonName;
    @Column(name = "authorized_person_surname")
    private String authorizedPersonSurname;
    @Column(name = "password")
    private String password;
    @Column(name = "country")
    private String country;
    @Column(name = "email")
    private String email;
    @Column(name = "image_path")
    private String imagePath;
}
