
package com.rideeasy.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto {
    private String id;
    private String name;
    private String email;
    private String phoneNumber;
    private String role;
    private Double rating;
    private String profilePicture;
    private String vehicleDetails;
    private Integer completedRides;
}
