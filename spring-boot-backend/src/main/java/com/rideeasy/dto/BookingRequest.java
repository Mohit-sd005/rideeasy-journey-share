
package com.rideeasy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {
    @NotBlank(message = "Ride ID is required")
    private String rideId;
    
    private String message;
}
