
package com.rideeasy.controller;

import com.rideeasy.dto.BookingRequest;
import com.rideeasy.dto.RideDto;
import com.rideeasy.dto.RideRequestDto;
import com.rideeasy.dto.RatingDto;
import com.rideeasy.service.RideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/rides")
@CrossOrigin(origins = "*")
public class RideController {

    @Autowired
    private RideService rideService;

    // Create a new ride (for riders)
    @PostMapping
    public ResponseEntity<RideDto> createRide(
            @Valid @RequestBody RideDto rideDto,
            Authentication authentication) {
        return ResponseEntity.ok(rideService.createRide(rideDto, authentication.getName()));
    }

    // Get all rides by rider (for riders)
    @GetMapping("/rider")
    public ResponseEntity<List<RideDto>> getRidesByRider(Authentication authentication) {
        return ResponseEntity.ok(rideService.getRidesByRider(authentication.getName()));
    }

    // Get all ride requests (for riders)
    @GetMapping("/requests")
    public ResponseEntity<List<RideRequestDto>> getRideRequests(Authentication authentication) {
        return ResponseEntity.ok(rideService.getRideRequests(authentication.getName()));
    }

    // Accept ride request (for riders)
    @PutMapping("/requests/{requestId}/accept")
    public ResponseEntity<Void> acceptRideRequest(
            @PathVariable String requestId,
            Authentication authentication) {
        rideService.acceptRideRequest(requestId, authentication.getName());
        return ResponseEntity.ok().build();
    }

    // Reject ride request (for riders)
    @PutMapping("/requests/{requestId}/reject")
    public ResponseEntity<Void> rejectRideRequest(
            @PathVariable String requestId,
            Authentication authentication) {
        rideService.rejectRideRequest(requestId, authentication.getName());
        return ResponseEntity.ok().build();
    }

    // Complete a ride (for riders)
    @PutMapping("/{rideId}/complete")
    public ResponseEntity<Void> completeRide(
            @PathVariable String rideId,
            Authentication authentication) {
        rideService.completeRide(rideId, authentication.getName());
        return ResponseEntity.ok().build();
    }

    // Get available rides (for passengers)
    @GetMapping("/available")
    public ResponseEntity<List<RideDto>> getAvailableRides(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to,
            @RequestParam(required = false) String date) {
        return ResponseEntity.ok(rideService.getAvailableRides(from, to, date));
    }

    // Book a ride (for passengers)
    @PostMapping("/book")
    public ResponseEntity<Void> bookRide(
            @Valid @RequestBody BookingRequest request,
            Authentication authentication) {
        rideService.bookRide(request, authentication.getName());
        return ResponseEntity.ok().build();
    }

    // Get passenger rides (for passengers)
    @GetMapping("/passenger")
    public ResponseEntity<List<RideDto>> getPassengerRides(Authentication authentication) {
        return ResponseEntity.ok(rideService.getPassengerRides(authentication.getName()));
    }

    // Rate a ride (for passengers)
    @PostMapping("/{rideId}/rate")
    public ResponseEntity<Void> rateRide(
            @PathVariable String rideId,
            @Valid @RequestBody RatingDto ratingDto,
            Authentication authentication) {
        rideService.rateRide(rideId, ratingDto, authentication.getName());
        return ResponseEntity.ok().build();
    }
}
