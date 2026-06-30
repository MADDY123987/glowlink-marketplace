package com.glowlink.marketplace.Repository;

import com.glowlink.marketplace.Model.PaymentOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder,Long> {
    PaymentOrder findByPaymentLinkId(String paymentLinkId);
}
