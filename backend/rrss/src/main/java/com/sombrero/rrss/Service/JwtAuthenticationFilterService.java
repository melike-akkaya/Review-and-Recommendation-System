package com.sombrero.rrss.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

@Service
public class JwtAuthenticationFilterService {
    public String extractUserName(String token) {
        return null;
    }

    private Claims extractAllClaims (String token) {
        return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token).getBody()
    }
}
