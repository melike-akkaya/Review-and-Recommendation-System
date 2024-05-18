package com.sombrero.rrss.Service;

import com.sombrero.rrss.Model.Post;
import com.sombrero.rrss.Repository.IPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final IPostRepository postRepository;

    @Autowired
    public PostService(IPostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public void addPost(Post post) {
        postRepository.save(post);
    }

    public void deletePost(int id) {
        postRepository.deleteById(id);
    }

    public List<Post> getAll() {
        return postRepository.findAll();
    }

    public Post getPostById(Integer postId) {
        return postRepository.findById(postId).orElse(null);
    }

    public void updatePost(Integer postId, Post post) {
        Post postToUpdate = postRepository.findById(postId).orElse(null);
        if (postToUpdate != null) {
            postToUpdate.setTitle(post.getTitle());
            postToUpdate.setContent(post.getContent());
            postRepository.save(postToUpdate);
        }
    }
}
