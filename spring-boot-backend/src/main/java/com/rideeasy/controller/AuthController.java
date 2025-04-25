
package com.rideeasy.controller;

import com.rideeasy.dto.AuthRequest;
import com.rideeasy.dto.AuthResponse;
import com.rideeasy.dto.GoogleAuthRequest;
import com.rideeasy.dto.RegisterRequest;
import com.rideeasy.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/rider/register")
    public ResponseEntity<AuthResponse> registerRider(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.registerRider(request));
    }

    @PostMapping("/passenger/register")
    public ResponseEntity<AuthResponse> registerPassenger(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.registerPassenger(request));
    }

    @PostMapping("/rider/login")
    public ResponseEntity<AuthResponse> loginRider(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.loginRider(request));
    }

    @PostMapping("/passenger/login")
    public ResponseEntity<AuthResponse> loginPassenger(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.loginPassenger(request));
    }

    @PostMapping("/rider/google")
    public ResponseEntity<AuthResponse> googleLoginRider(@RequestBody GoogleAuthRequest request) {
        return ResponseEntity.ok(authService.googleAuthRider(request.getToken()));
    }

    @PostMapping("/passenger/google")
    public ResponseEntity<AuthResponse> googleLoginPassenger(@RequestBody GoogleAuthRequest request) {
        return ResponseEntity.ok(authService.googleAuthPassenger(request.getToken()));
    }
}
