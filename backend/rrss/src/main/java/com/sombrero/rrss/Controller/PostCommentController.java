package com.sombrero.rrss.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sombrero.rrss.Model.PostComment;
import com.sombrero.rrss.Service.PostCommentService;
import com.sombrero.rrss.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/postComment")
public class PostCommentController {
    private final PostCommentService postCommentService;
    private final UserService userService;
    @GetMapping("/")
    public ResponseEntity<Iterable<PostComment>> getAllPostComments() {
        Iterable<PostComment> postCommentList = postCommentService.getAll();
        return ResponseEntity.ok(postCommentList);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Iterable<PostComment>> getPostCommentsByPostId(@PathVariable Integer postId) {
        Iterable<PostComment> postCommentList = postCommentService.getByPostId(postId);
        return ResponseEntity.ok(postCommentList);
    }

    @PostMapping("/add")
    public ResponseEntity<PostComment> addPostComment(@RequestParam("comment") String postCommentJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            PostComment postComment = objectMapper.readValue(postCommentJson, PostComment.class);

            postComment.setDate(getCurrentDate());
            postComment.setAuthorName(userService.loadUserById(postComment.getAuthorId()).get().getName());
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
