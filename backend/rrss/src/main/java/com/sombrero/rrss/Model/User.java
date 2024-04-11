package com.sombrero.rrss.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;
    @Column(name = "name")
    private String name;
    @Column(name = "surname")
    private String surname;
    @Column(name = "password")
    private String password;
    @Column(name = "country")
    private String country;
    @Column(name = "email")
    private String email;
    @Column(name = "is_influencer")
    private boolean isInfluencer;
    @Column(name = "is_community_moderator")
    private boolean isCommunityModerator;
    @Column(name = "is_admin")
    private boolean isAdmin;
    @Column(name = "social_media_account")
    private String socialMediaAccount;

    @Column(name = "avatar_path")
    @Lob
    private byte[] avatar_path;
}
