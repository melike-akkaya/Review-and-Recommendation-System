package com.sombrero.rrss.Controller;

import com.sombrero.rrss.Model.AuthenticationResponse;
import com.sombrero.rrss.Model.LogInRequest;
import com.sombrero.rrss.Model.SignUpRequest;
import com.sombrero.rrss.Service.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.Duration;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LogInRequest request, HttpServletResponse response) {
        AuthenticationResponse authResponse = authenticationService.logIn(request);
        ResponseCookie cookie = ResponseCookie.from("jwt", authResponse.getToken())
                .httpOnly(false)
                .secure(true) // application is HTTPS
                .path("/")
                .maxAge(Duration.ofDays(365 * 10)) // 10 years expiration
                .sameSite("Lax")
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(authResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie temp = ResponseCookie.from("jwt")
                .httpOnly(false)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, temp.toString());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, temp.toString())
                .body("logged out");
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthenticationResponse> signUp(@RequestBody SignUpRequest request) {
        return ResponseEntity.ok(authenticationService.signUp(request));
    }
}
