package com.glowlink.marketplace.payload.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class BookingSlotDTO {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
