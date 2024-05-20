package com.sombrero.rrss.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "post_comment")
public class PostComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer commentId;

    @Column(name = "post_id")
    private Integer postId;

    @Column(name = "author_id")
    private Integer authorId;

    @Column(name = "comment")
    private String comment;

    @Column(name = "date")
    private String date;
}
