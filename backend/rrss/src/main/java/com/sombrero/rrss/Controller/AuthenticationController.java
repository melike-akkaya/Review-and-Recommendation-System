package com.sombrero.rrss.Controller;

import com.sombrero.rrss.Model.AuthenticationResponse;
import com.sombrero.rrss.Model.LogInRequest;
import com.sombrero.rrss.Model.SignUpRequest;
import com.sombrero.rrss.Service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;
    @PostMapping("/signup")
    public ResponseEntity<AuthenticationResponse> signUp(@RequestBody SignUpRequest request) {
        return ResponseEntity.ok(service.signUp(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> logIn(@RequestBody LogInRequest request) {
        return ResponseEntity.ok(service.logIn(request));
    }
}
