
package com.rideeasy.controller;

import com.rideeasy.dto.PasswordUpdateDto;
import com.rideeasy.dto.UserDto;
import com.rideeasy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUserProfile(Authentication authentication) {
        return ResponseEntity.ok(userService.getUserProfile(authentication.getName()));
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDto> updateUserProfile(
            @Valid @RequestBody UserDto userDto,
            Authentication authentication) {
        return ResponseEntity.ok(userService.updateUserProfile(userDto, authentication.getName()));
    }

    @PutMapping("/password")
    public ResponseEntity<Void> updatePassword(
            @Valid @RequestBody PasswordUpdateDto passwordUpdateDto,
            Authentication authentication) {
        userService.updatePassword(passwordUpdateDto, authentication.getName());
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/profile-picture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> uploadProfilePicture(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {
        String url = userService.uploadProfilePicture(file, authentication.getName());
        return ResponseEntity.ok(Map.of("url", url));
    }

    @GetMapping("/rider/{riderId}")
    public ResponseEntity<UserDto> getRiderProfile(@PathVariable String riderId) {
        return ResponseEntity.ok(userService.getRiderPublicProfile(riderId));
    }
}
