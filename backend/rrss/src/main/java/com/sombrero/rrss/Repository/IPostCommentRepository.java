package com.sombrero.rrss.Repository;

import com.sombrero.rrss.Model.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPostCommentRepository extends JpaRepository<PostComment, Integer> {
    List<PostComment> findByPostId(Integer postId);
}
