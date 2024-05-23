package com.sombrero.rrss.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sombrero.rrss.Model.Post;
import com.sombrero.rrss.Service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/community/posts")
public class PostController {
    private final PostService postService;
    private static final int  AVERAGE_READING_SPEED_PER_MINUTE=238 ;

    @PostMapping("/add")
    public ResponseEntity<Post> addPost(@RequestParam("post") String postJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Post post = objectMapper.readValue(postJson, Post.class);


            post.setDate(getCurrentDate());
            post.setReadingTime(calculateReadingTime(post.getContent()));

            postService.addPost(post);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            System.out.println("Error processing post: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update/{postId}")
    public ResponseEntity<Post> updatePost(@PathVariable Integer postId, @RequestParam("post") String postJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Post updatedPost = objectMapper.readValue(postJson, Post.class);

            Post post=postService.getPostById(postId);

            post.setTitle(updatedPost.getTitle());
            post.setContent(updatedPost.getContent());
            post.setReadingTime(calculateReadingTime(updatedPost.getContent()));
            post.setDate(getCurrentDate());

            postService.save(post);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            System.out.println("Error updating post: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }


    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<Post> deletePost(@PathVariable Integer postId) {
        try {
            postService.deletePost(postId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println("Error deleting post: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/")
    public ResponseEntity<Iterable<Post>> getAllPosts() {
        Iterable<Post> postList = postService.getAll();
        return ResponseEntity.ok(postList);
    }

    private int calculateReadingTime(String content) {
        int wordCount = content.split("\\s+").length;
        return wordCount / AVERAGE_READING_SPEED_PER_MINUTE;
    }

    private String getCurrentDate()
    {
        return java.time.LocalDate.now().toString();
    }


}
