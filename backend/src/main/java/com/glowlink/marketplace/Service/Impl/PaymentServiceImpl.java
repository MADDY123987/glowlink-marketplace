package com.glowlink.marketplace.Service.Impl;

import com.glowlink.marketplace.Model.PaymentOrder;
import com.glowlink.marketplace.Repository.PaymentOrderRepository;
import com.glowlink.marketplace.Service.PaymentService;
import com.glowlink.marketplace.domain.PaymentMethod;
import com.glowlink.marketplace.payload.dto.BookingDTO;
import com.glowlink.marketplace.payload.dto.UserDTO;
import com.glowlink.marketplace.payload.response.PaymentLinkResponse;

public class PaymentServiceImpl implements PaymentService {

    private PaymentOrderRepository paymentOrderRepository;
    @Override
    public PaymentLinkResponse createOrder(UserDTO user, BookingDTO booking, PaymentMethod paymentMethod) {
        return null;
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) {
        return null;
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentId(String paymentId) {
        return null;
    }

    @Override
    public PaymentLinkResponse createRazorpayPaymentLink(UserDTO user, Long amount, Long order) {
        return null;
    }

    @Override
    public String createStripePaymentLink(UserDTO user, Long amount, Long orderId) {
        return "";
    }
}
