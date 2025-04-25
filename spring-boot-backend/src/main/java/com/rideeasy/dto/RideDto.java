
package com.rideeasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Future;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RideDto {
    private String id;

    @NotBlank(message = "Source location is required")
    private String from;

    @NotBlank(message = "Destination location is required")
    private String to;

    @NotNull(message = "Date is required")
    @Future(message = "Date must be in the future")
    private LocalDate date;

    @NotNull(message = "Time is required")
    private LocalTime time;

    @NotNull(message = "Number of seats is required")
    @Min(value = 1, message = "At least 1 seat is required")
    private Integer seats;

    @NotNull(message = "Price is required")
    @Min(value = 1, message = "Price must be greater than 0")
    private Double price;

    private String status;
    private String riderId;
    private String riderName;
    private Double riderRating;
    private String vehicleDetails;
    private String notes;
    private List<PassengerDto> passengers;
    private String createdAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PassengerDto {
        private String id;
        private String name;
        private Double rating;
        private String status;
    }
}
