package com.sombrero.rrss.Controller;

import com.sombrero.rrss.Model.Post;
import com.sombrero.rrss.Service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/community/posts")
public class PostController {
    private final PostService postService;
    private static final int  AVERAGE_READING_SPEED_PER_MINUTE=238 ;

    @PostMapping("/add")
    public ResponseEntity<Post> addPost(Post post) {
        try {
            post.setDate(getCurrentDate());
            post.setReadingTime(calculateReadingTime(post.getContent()));

            postService.addPost(post);
            return ResponseEntity.ok(post);
        } catch (Exception e) {
            System.out.println("Error processing post: " + e.getMessage());
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
