package com.sombrero.rrss.Repository;

import com.sombrero.rrss.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPostRepository extends JpaRepository<Post, Integer> {
}
