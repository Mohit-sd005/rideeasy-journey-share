
package com.rideeasy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDetailsDto {
    @NotBlank(message = "Payment ID is required")
    private String paymentId;

    @NotBlank(message = "Order ID is required")
    private String orderId;

    @NotBlank(message = "Signature is required")
    private String signature;
}
