
package com.rideeasy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseDto {
    private String orderId;
    private String amount;
    private String currency;
    private String key;
    private UserPaymentInfoDto user;
    private String rideId;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserPaymentInfoDto {
        private String name;
        private String email;
        private String contactNumber;
    }
}
