package com.glowlink.marketplace.Service;

import com.glowlink.marketplace.Model.Salon;
import com.glowlink.marketplace.payload.dto.SalonDTO;
import com.glowlink.marketplace.payload.dto.UserDTO;

import java.util.List;

public interface SalonService {
    Salon createSalon(SalonDTO req, UserDTO user);

    Salon updateSalon(SalonDTO salon,UserDTO user,Long salonId) throws Exception;

    List<Salon> getAllSalons();

    Salon getSalonById(Long salonId) throws Exception;

    Salon getSalonByOwnerId(Long ownerId);

    List<Salon> searchSalonByCity(String city);
}
