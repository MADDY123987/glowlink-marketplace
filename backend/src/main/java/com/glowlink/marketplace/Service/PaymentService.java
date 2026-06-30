package com.glowlink.marketplace.Service;

import com.glowlink.marketplace.Model.PaymentOrder;
import com.glowlink.marketplace.domain.PaymentMethod;
import com.glowlink.marketplace.payload.dto.BookingDTO;
import com.glowlink.marketplace.payload.dto.UserDTO;
import com.glowlink.marketplace.payload.response.PaymentLinkResponse;

public interface PaymentService {
    PaymentLinkResponse createOrder(UserDTO user,
                                    BookingDTO booking,
                                    PaymentMethod paymentMethod);
    PaymentOrder getPaymentOrderById(Long id);

    PaymentOrder getPaymentOrderByPaymentId(String paymentId);

    PaymentLinkResponse createRazorpayPaymentLink(UserDTO user,
                                                  Long amount,
                                                  Long order);

    String createStripePaymentLink(UserDTO user,
                                   Long amount,
                                   Long orderId);
}
