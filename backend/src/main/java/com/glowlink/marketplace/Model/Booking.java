package com.glowlink.marketplace.Model;

import com.glowlink.marketplace.domain.BookingStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;
import java.util.Set;

@Entity
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long salonId;

    private Long customerId;
    private LocalTime startTime;
    private LocalTime endTime;

    @ElementCollection
    private Set<Long> serviceIds;

    private BookingStatus status=BookingStatus.PENDING;

    private int totalServices;
}
