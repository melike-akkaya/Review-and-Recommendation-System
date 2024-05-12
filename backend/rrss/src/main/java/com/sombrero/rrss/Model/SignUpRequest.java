package com.sombrero.rrss.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest {
    private String name;
    private String surname;
    private String password;
    private String country;
    private String email;
    private Role role;
}
