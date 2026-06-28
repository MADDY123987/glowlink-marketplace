package com.glowlink.marketplace.Service;

import com.glowlink.marketplace.Model.Booking;
import com.glowlink.marketplace.Model.SalonReport;
import com.glowlink.marketplace.domain.BookingStatus;
import com.glowlink.marketplace.payload.dto.BookingRequest;
import com.glowlink.marketplace.payload.dto.SalonDTO;
import com.glowlink.marketplace.payload.dto.ServiceDTO;
import com.glowlink.marketplace.payload.dto.UserDTO;

import java.awt.print.Book;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface BookingService {
    Booking createBooking(BookingRequest booking, UserDTO user, SalonDTO salon, Set<ServiceDTO>serviceDTOSet) throws Exception;
    List<Booking> getBookingByCustomer(Long customerId);
    List<Booking> getBookingBySalon(Long salonId);
    Booking getBookingById(Long id) throws Exception;
    Booking updateBooking(Long bookingId, BookingStatus status) throws Exception;
    List<Booking> getBookingByDate(LocalDate date,Long salonId);
    SalonReport getSalonReport(Long salonId);

    //void deleteBooking(Long bookingId);
}
