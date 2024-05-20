package com.sombrero.rrss.Repository;

import com.sombrero.rrss.Model.PostComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPostCommentRepository extends JpaRepository<PostComment, Integer> {
}
