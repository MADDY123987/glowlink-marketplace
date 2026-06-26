package com.glowlink.marketplace.Service.Impl;

import com.glowlink.marketplace.Model.Booking;
import com.glowlink.marketplace.Model.SalonReport;
import com.glowlink.marketplace.Repository.BookingRepository;
import com.glowlink.marketplace.Service.BookingService;
import com.glowlink.marketplace.domain.BookingStatus;
import com.glowlink.marketplace.payload.dto.BookingRequest;
import com.glowlink.marketplace.payload.dto.SalonDTO;
import com.glowlink.marketplace.payload.dto.ServiceDTO;
import com.glowlink.marketplace.payload.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;
    @Override
    public Booking createBooking(BookingRequest booking, UserDTO user, SalonDTO salon, Set<ServiceDTO> serviceDTOSet) {
        int totalDuration=serviceDTOSet.stream()
                .mapToInt(ServiceDTO::getDuration)
                .sum();
        LocalDateTime bookingStartTime=booking.getStartTime();
        LocalDateTime bookingEndTime=bookingStartTime.plusMinutes(totalDuration);
    }

    @Override
    public List<Booking> getBookingByCustomer(Long customerId) {
        return List.of();
    }

    @Override
    public List<Booking> getBookingBySalon(Long salonId) {
        return List.of();
    }

    @Override
    public Booking getBookingById(Long id) {
        return null;
    }

    @Override
    public Booking updateBooking(Long bookingId, BookingStatus status) {
        return null;
    }

    @Override
    public List<Booking> getBookingByDate(LocalDate date, Long salonId) {
        return List.of();
    }

    @Override
    public SalonReport getSalonReport(Long salonId) {
        return null;
    }
}
