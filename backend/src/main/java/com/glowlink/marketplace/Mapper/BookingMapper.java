package com.glowlink.marketplace.Mapper;

import com.glowlink.marketplace.Model.Booking;
import com.glowlink.marketplace.payload.dto.BookingDTO;

public class BookingMapper {
    public static BookingDTO toBookingDTO(Booking booking){
        BookingDTO bookingDTO=new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setCustomerId(bookingDTO.getCustomerId());
        bookingDTO.setStatus(booking.getStatus());
        bookingDTO.setEndTime(booking.getEndTime());
        bookingDTO.setStartTime(booking.getStartTime());
        bookingDTO.setSalonId(booking.getSalonId());
        bookingDTO.setServiceIds(booking.getServiceIds());

        return bookingDTO;
    }
}
