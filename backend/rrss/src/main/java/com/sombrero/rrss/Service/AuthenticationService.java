package com.sombrero.rrss.Service;

import com.sombrero.rrss.Model.AuthenticationResponse;
import com.sombrero.rrss.Model.LogInRequest;
import com.sombrero.rrss.Model.SignUpRequest;
import com.sombrero.rrss.Model.User;
import com.sombrero.rrss.Repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final IUserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtAuthenticationFilterService jwtAuthenticationFilterService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse signUp(SignUpRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setSurname(request.getSurname());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        String[] words = request.getCountry().split("[-\\s]"); // split the country name by "-" or " "

        StringBuilder capitalizedCountry = new StringBuilder();

        for (int i = 0; i < words.length; i++) {
            String word = words[i];
            if (word.equalsIgnoreCase("and") || word.equalsIgnoreCase("of")) {
                capitalizedCountry.append(word.toLowerCase());
            } else {
                capitalizedCountry.append(Character.toUpperCase(word.charAt(0))).append(word.substring(1).toLowerCase());
            }

            if (i < words.length - 1) {
                capitalizedCountry.append(" ");
            }
        }

        user.setCountry(capitalizedCountry.toString());
        user.setImage(request.getImage());
        user.setMerchantName(request.getMerchantName());
        repository.save(user);

        var jwtToken = jwtAuthenticationFilterService.generateToken(new HashMap<>(), user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse logIn(LogInRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail()).orElseThrow();

        var jwtToken = jwtAuthenticationFilterService.generateToken(new HashMap<>(), user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
