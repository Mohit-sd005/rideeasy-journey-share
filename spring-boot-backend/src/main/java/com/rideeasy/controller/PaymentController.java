
package com.rideeasy.controller;

import com.rideeasy.dto.PaymentDetailsDto;
import com.rideeasy.dto.PaymentResponseDto;
import com.rideeasy.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/initiate/{rideId}")
    public ResponseEntity<PaymentResponseDto> initiatePayment(
            @PathVariable String rideId,
            Authentication authentication) {
        return ResponseEntity.ok(paymentService.initiatePayment(rideId, authentication.getName()));
    }

    @PostMapping("/verify/{rideId}")
    public ResponseEntity<Void> verifyPayment(
            @PathVariable String rideId,
            @Valid @RequestBody PaymentDetailsDto paymentDetails,
            Authentication authentication) {
        paymentService.verifyPayment(rideId, paymentDetails, authentication.getName());
        return ResponseEntity.ok().build();
    }
}
