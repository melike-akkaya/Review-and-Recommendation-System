package com.sombrero.rrss.Controller;

import com.sombrero.rrss.Model.PostComment;
import com.sombrero.rrss.Service.PostCommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/postComment")
public class PostCommentController {
    private final PostCommentService postCommentService;

    @GetMapping("/")
    public ResponseEntity<Iterable<PostComment>> getAllPostComments() {
        Iterable<PostComment> postCommentList = postCommentService.getAll();
        return ResponseEntity.ok(postCommentList);
    }

    @PostMapping("/add")
    public ResponseEntity<PostComment> addPostComment(PostComment postComment) {
        try {
            postComment.setDate(getCurrentDate());
            postCommentService.addPostComment(postComment);
            return ResponseEntity.ok(postComment);
        } catch (Exception e) {
            System.out.println("Error processing post comment: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delete/{postCommentId}")
    public ResponseEntity<PostComment> deletePostComment(@PathVariable Integer postCommentId) {
        try {
            postCommentService.deletePostComment(postCommentId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println("Error deleting post comment: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/update/{postCommentId}")
    public ResponseEntity<PostComment> updatePostComment(@PathVariable Integer postCommentId, PostComment postComment) {
        try {
            postComment.setDate(getCurrentDate());
            postCommentService.updatePostComment(postCommentId, postComment);
            return ResponseEntity.ok(postComment);
        } catch (Exception e) {
            System.out.println("Error updating post comment: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    private String getCurrentDate()
    {
        return java.time.LocalDate.now().toString();
    }
}
