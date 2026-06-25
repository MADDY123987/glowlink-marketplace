package com.glowlink.marketplace.Service;

import com.glowlink.marketplace.Model.Booking;
import com.glowlink.marketplace.payload.dto.SalonDTO;
import com.glowlink.marketplace.payload.dto.ServiceDTO;
import com.glowlink.marketplace.payload.dto.UserDTO;

import java.util.Set;

public interface BookingService {
    Booking createBooking(BookingRequest booking, UserDTO user, SalonDTO salon, Set<ServiceDTO>serviceDTOSet);
}
