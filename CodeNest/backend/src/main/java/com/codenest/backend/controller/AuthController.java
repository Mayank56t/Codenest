package com.codenest.backend.controller;

import com.codenest.backend.model.User;
import com.codenest.backend.repository.UserRepository;
import com.codenest.backend.repository.ProgressRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final ProgressRepository progressRepository;

    public AuthController(
            UserRepository userRepository,
            ProgressRepository progressRepository) {

        this.userRepository = userRepository;
        this.progressRepository = progressRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (user.getUsername() == null ||
                user.getUsername().trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Username is required"));
        }

        if (user.getPassword() == null ||
                user.getPassword().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Password is required"));
        }

        String username = user.getUsername().trim();

        if (userRepository.existsByUsername(username)) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Username already exists"));
        }

        User newUser =
                new User(username, user.getPassword());

        userRepository.save(newUser);

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Registration successful"
        );

        response.put(
                "username",
                username
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        if (user.getUsername() == null ||
                user.getPassword() == null) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    "Username and password are required"
                            )
                    );
        }

        return userRepository
                .findByUsername(
                        user.getUsername().trim()
                )
                .map(existingUser -> {

                    if (!existingUser
                            .getPassword()
                            .equals(user.getPassword())) {

                        return ResponseEntity
                                .status(HttpStatus.UNAUTHORIZED)
                                .body(
                                        Map.of(
                                                "message",
                                                "Invalid username or password"
                                        )
                                );
                    }

                    Map<String, Object> response =
                            new HashMap<>();

                    response.put(
                            "message",
                            "Login successful"
                    );

                    response.put(
                            "username",
                            existingUser.getUsername()
                    );

                    return ResponseEntity.ok(response);
                })
                .orElseGet(() ->
                        ResponseEntity
                                .status(HttpStatus.UNAUTHORIZED)
                                .body(
                                        Map.of(
                                                "message",
                                                "Invalid username or password"
                                        )
                                )
                );
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteAccount(
            @RequestParam String username) {

        if (username == null ||
                username.trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    "Username is required"
                            )
                    );
        }

        String cleanUsername =
                username.trim();

        if (!userRepository
                .existsByUsername(cleanUsername)) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(
                            Map.of(
                                    "message",
                                    "User not found"
                            )
                    );
        }

        // Delete all quiz progress
        // belonging to this user.
        progressRepository
                .deleteByUsername(cleanUsername);

        // Delete the user account.
        userRepository
                .delete(
                        userRepository
                                .findByUsername(cleanUsername)
                                .get()
                );

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Account deleted successfully"
                )
        );
    }
}