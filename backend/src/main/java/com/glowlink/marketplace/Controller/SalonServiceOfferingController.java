package com.glowlink.marketplace.Controller;


import com.glowlink.marketplace.Model.ServiceOffering;
import com.glowlink.marketplace.Service.ServiceOfferingService;
import com.glowlink.marketplace.payload.dto.CategoryDTO;
import com.glowlink.marketplace.payload.dto.SalonDTO;
import com.glowlink.marketplace.payload.dto.ServiceDTO;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/service-offering/salon-owner")
public class SalonServiceOfferingController {
    private final ServiceOfferingService serviceOfferingService;

    @PostMapping
    public ResponseEntity<ServiceOffering> createServices(
            @RequestBody ServiceDTO serviceDTO
            )
    {
        SalonDTO salonDTO=new SalonDTO();
        salonDTO.setId(1L);

        CategoryDTO categoryDTO=new CategoryDTO();
        categoryDTO.setId(serviceDTO.getCategory());

        ServiceOffering serviceOffering=serviceOfferingService
                .createService(salonDTO,serviceDTO,categoryDTO);
        return ResponseEntity.ok(serviceOffering);
    }

    @PostMapping("/{id}")
    public ResponseEntity<ServiceOffering> updateService(
            @PathVariable Long id,
            @RequestBody ServiceOffering serviceOffering
    ) throws Exception {

        ServiceOffering serviceOfferings=serviceOfferingService
                .updateService(id,serviceOffering);
        return ResponseEntity.ok(serviceOffering);
    }




}
