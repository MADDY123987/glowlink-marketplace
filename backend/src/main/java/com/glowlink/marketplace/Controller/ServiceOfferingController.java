package com.glowlink.marketplace.Controller;


import com.glowlink.marketplace.Model.ServiceOffering;
import com.glowlink.marketplace.Service.ServiceOfferingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/service-offering")
@RequiredArgsConstructor
public class ServiceOfferingController {
    private  ServiceOfferingService serviceOfferingService;

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<Set<ServiceOffering>> getServiceBySalonId(
            @PathVariable Long salonId,
            @RequestParam(required = false) Long categoryId
    ){
        Set<ServiceOffering> serviceOfferings=serviceOfferingService
                .getAllServicesBySalonId(salonId,categoryId);
        return ResponseEntity.ok(serviceOfferings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceOffering> getServicesById(
            @PathVariable Long id
    ) throws Exception {
        ServiceOffering serviceOffering=serviceOfferingService
                .getServiceById(id);

        return ResponseEntity.ok(serviceOffering);
    }

    @GetMapping("/list/{ids}")
    public ResponseEntity<Set<ServiceOffering>> getServiceByIds(
            @PathVariable Set<Long>ids
    ){
        Set<ServiceOffering> serviceOfferings=serviceOfferingService
                .getServicesByIds(ids);
        return ResponseEntity.ok(serviceOfferings);
    }
}
