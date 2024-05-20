package com.sombrero.rrss.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "review")
public class Review{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewId;

    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "author_id")
    private Integer authorId;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "comment")
    private String comment;

    @Column(name = "author_name")
    private String authorName;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "total_vote")
    private Integer totalVote=0;
}