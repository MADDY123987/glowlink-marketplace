package com.glowlink.marketplace.Controller;

import com.glowlink.marketplace.Mapper.BookingMapper;
import com.glowlink.marketplace.Model.Booking;
import com.glowlink.marketplace.Service.BookingService;
import com.glowlink.marketplace.payload.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestParam Long salonId,
            @RequestBody BookingRequest bookingRequest
    ) throws Exception {
        UserDTO user=new UserDTO();
        user.setId(1L);

        SalonDTO salon=new SalonDTO();
        salon.setId(salonId);

        Set<ServiceDTO> serviceDTOSet=new HashSet<>();

        ServiceDTO serviceDTO=new ServiceDTO();
        serviceDTO.setId(1L);
        serviceDTO.setPrice(399);
        serviceDTO.setDuration(45);
        serviceDTO.setName("Hair Cut for Men");


        serviceDTOSet.add(serviceDTO);

        Booking booking=bookingService.createBooking(bookingRequest,
                user,
                salon,
                serviceDTOSet);

        return ResponseEntity.ok(booking);
    }

    @GetMapping("/customer")
    public ResponseEntity<Set<BookingDTO>> getBookingByCustomer(
    ){


        List<Booking> bookings=bookingService.getBookingByCustomer(1L);
        return ResponseEntity.ok(getBookingDTOs(bookings));
    }

    @GetMapping("/salon")
    public ResponseEntity<Set<BookingDTO>> getBookingBySalon(
    ){


        List<Booking> bookings=bookingService.getBookingBySalon(1L);
        return ResponseEntity.ok(getBookingDTOs(bookings));
    }

    private Set<BookingDTO> getBookingDTOs(List<Booking>bookings){
        return bookings.stream()
                .map(booking ->{
                    return BookingMapper.toBookingDTO(booking);
                }).collect(Collectors.toSet());
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingDTO> getBookingByIds(@PathVariable Long bookingId
    ) throws Exception {
        Booking bookings=bookingService.getBookingById(bookingId);
        return ResponseEntity.ok(BookingMapper.toBookingDTO(bookings));
    }
}
