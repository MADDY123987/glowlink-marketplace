package com.glowlink.marketplace.Controller;

import com.glowlink.marketplace.Mapper.SalonMapper;
import com.glowlink.marketplace.Model.Salon;
import com.glowlink.marketplace.Service.SalonService;
import com.glowlink.marketplace.payload.dto.SalonDTO;
import com.glowlink.marketplace.payload.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salons")
@RequiredArgsConstructor
public class SalonController {
    private final SalonService salonService;
    //http://localhost:5002/api/salons
    @PostMapping
    public ResponseEntity<SalonDTO> createSalon(@RequestBody SalonDTO salonDTO){
        UserDTO userDTO=new UserDTO();
        userDTO.setId(1L);
        Salon salon=salonService.createSalon(salonDTO,userDTO);
        SalonDTO salonDTO1= SalonMapper.mapToDTO(salon);
        return ResponseEntity.ok(salonDTO1);

    }
    // http://localhost:5002/api/salons/2
    @PutMapping("/{id}")
    public ResponseEntity<SalonDTO> updateSalon(
            @PathVariable("id") Long salonId,
            @RequestBody SalonDTO salonDTO
    ) throws Exception {
        UserDTO userDTO=new UserDTO();
        userDTO.setId(1L);
        Salon salon=salonService.updateSalon(salonDTO,userDTO,salonId);
        SalonDTO salonDTO1= SalonMapper.mapToDTO(salon);
        return ResponseEntity.ok(salonDTO1);
    }

    //http://localhost:5002/api/salons
    @GetMapping()
    public ResponseEntity<List<SalonDTO>> getSalons()
    {
        List<Salon> salons=salonService.getAllSalons();
        List<SalonDTO> salonDTOS=salons.stream()
                .map(SalonMapper::mapToDTO)
                .toList();
        return ResponseEntity.ok(salonDTOS);
    }
    //http://locahost:5002/api/salons/
    @GetMapping("/{salonId}")
    public ResponseEntity<SalonDTO> getSalonById(
            @PathVariable Long salonId
    ) throws Exception {
        Salon salons=salonService.getSalonById(salonId);
        SalonDTO salonDTO=SalonMapper.mapToDTO(salons);
        return ResponseEntity.ok(salonDTO);
    }
    //http://localhost:5002/api/salons/search?city=chennai
    @GetMapping("/search")
    public ResponseEntity<List<SalonDTO>> searchSalons(
            @RequestParam("city")String city
    )
    {
        List<Salon> salons=salonService.searchSalonByCity(city);
        List<SalonDTO> salonDTOS=salons.stream()
                .map(SalonMapper::mapToDTO)
                .toList();
        return ResponseEntity.ok(salonDTOS);
    }
    //http://localhost:5002/api/salons/5
    @GetMapping("/owner")
    public ResponseEntity<SalonDTO> getSalonByOwner()
    {
        UserDTO userDTO=new UserDTO();
        userDTO.setId(1L);
        Salon salon=salonService.getSalonByOwnerId(userDTO.getId());
        SalonDTO salonDTO=SalonMapper.mapToDTO(salon);
        return ResponseEntity.ok(salonDTO);
    }
}
