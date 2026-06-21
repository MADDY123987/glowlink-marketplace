package com.glowlink.marketplace.Service.Impl;

import com.glowlink.marketplace.Model.Salon;
import com.glowlink.marketplace.Repository.SalonRepository;
import com.glowlink.marketplace.Service.SalonService;
import com.glowlink.marketplace.payload.dto.SalonDTO;
import com.glowlink.marketplace.payload.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SalonServiceImpl implements SalonService {
    private final SalonRepository salonRepository;

    @Override
    public Salon createSalon(SalonDTO req, UserDTO user) {
        Salon salon=new Salon();
        salon.setName(req.getName());
        salon.setAddress(req.getAddress());
        salon.setEmail(req.getEmail());
        salon.setCity(req.getCity());
        salon.setImages(req.getImages());
        salon.setOwnerId(req.getId());
        salon.setOpenTime(req.getOpenTime());
        salon.setCloseTime(req.getCloseTime());
        salon.setPhoneNumber(req.getPhoneNumber());
        return salonRepository.save(salon);
    }

    @Override
    public Salon updateSalon(SalonDTO salon, UserDTO user, Long salonId) throws Exception {
        Salon existingsalon=salonRepository.findById(salonId).orElseThrow(null);
        if(existingsalon!=null && salon.getOwnerId().equals(user.getId())){
            existingsalon.setName(salon.getName());
            existingsalon.setAddress(salon.getAddress());
            existingsalon.setEmail(salon.getEmail());
            existingsalon.setCity(salon.getCity());
            existingsalon.setImages(salon.getImages());
            existingsalon.setOwnerId(user.getId());
            existingsalon.setOpenTime(salon.getOpenTime());
            existingsalon.setCloseTime(salon.getCloseTime());
            existingsalon.setPhoneNumber(salon.getPhoneNumber());
        }throw new Exception("Salon Not Exist");
    }

    @Override
    public List<Salon> getAllSalons() {
        return salonRepository.findAll();
    }

    @Override
    public Salon getSalonById(Long salonId) throws Exception {
        Salon salon=salonRepository.findById(salonId).orElse(null);
        if(salon==null){
            throw  new Exception("Salon Does not Exist");
        }
        return salon;
    }

    @Override
    public Salon getSalonByOwnerId(Long ownerId) {
        return salonRepository.findByOwnerId(ownerId);
    }

    @Override
    public List<Salon> searchSalonByCity(String city) {
        return salonRepository.searchSalon(city);
    }
}
