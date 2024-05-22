package com.sombrero.rrss.Service;

import com.sombrero.rrss.Model.PostComment;
import com.sombrero.rrss.Repository.IPostCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostCommentService {
    private final IPostCommentRepository postCommentRepository;

    @Autowired
    public PostCommentService(IPostCommentRepository postCommentRepository) {
        this.postCommentRepository = postCommentRepository;
    }

    public void addPostComment(PostComment postComment) {
        postCommentRepository.save(postComment);
    }

    public void deletePostComment(int id) {
        postCommentRepository.deleteById(id);
    }

    public List<PostComment> getByPostId(Integer postId) {
        return postCommentRepository.findByPostId(postId);
    }

    public List<PostComment> getAll() {
        return postCommentRepository.findAll();
    }

    public void updatePostComment(Integer postCommentId, PostComment postComment) {
        PostComment postCommentToUpdate = postCommentRepository.findById(postCommentId).orElse(null);
        if (postCommentToUpdate != null) {
            postCommentToUpdate.setComment(postComment.getComment());
            postCommentRepository.save(postCommentToUpdate);
        }
    }


}
