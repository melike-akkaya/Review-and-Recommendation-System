package com.sombrero.rrss.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer postId;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "author_id")
    private String authorId;

    @Column(name = "date")
    private String date;

    @Column(name = "type")
    private String type;

    @Column(name ="reading_time")
    private int readingTime;

    @Column(name = "pickedByStaff")
    private boolean pickedByStaff;


}
