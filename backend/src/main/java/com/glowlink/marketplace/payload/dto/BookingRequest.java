package com.glowlink.marketplace.payload.dto;

import lombok.Data;

import java.time.LocalTime;
import java.util.Set;

@Data
public class BookingRequest {
    private LocalTime startTime;
    private LocalTime endTime;
    private Set<Long> servicesIds;
}
