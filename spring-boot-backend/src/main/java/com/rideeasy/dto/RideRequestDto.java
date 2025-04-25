
package com.rideeasy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RideRequestDto {
    private String id;
    private String rideId;
    private String from;
    private String to;
    private LocalDate date;
    private String passengerName;
    private Double passengerRating;
    private String status;
    private String message;
}
