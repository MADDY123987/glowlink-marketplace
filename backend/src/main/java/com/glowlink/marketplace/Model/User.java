package com.glowlink.marketplace.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;


@Entity
@Table(name = "Users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "UserName is Mandatory")
    private String username;

    private String fullName;

    @NotBlank(message = "Email is Mandatory")
    private String email;

    private String phone;
    @NotBlank(message = "Role is Mandatory")
    private String role;
    @NotBlank(message = "Password is Mandatory")
    private String password;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
