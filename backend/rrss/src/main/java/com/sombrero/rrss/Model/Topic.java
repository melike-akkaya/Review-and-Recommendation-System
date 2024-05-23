package com.sombrero.rrss.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "topic")
public class Topic {

    @Id
    @Column(name = "post_id")
    private Integer postId;

    @Column(name = "culture")
    private Integer culture;

    @Column(name = "politics")
    private Integer politics;

    @Column(name = "consumerism")
    private Integer consumerism;

    @Column(name = "technology")
    private Integer technology;

    @Column(name = "environment")
    private Integer environment;

    @Column(name = "minimalism")
    private Integer minimalism;

    @Column(name = "lifeHack")
    private Integer lifeHack;
}
