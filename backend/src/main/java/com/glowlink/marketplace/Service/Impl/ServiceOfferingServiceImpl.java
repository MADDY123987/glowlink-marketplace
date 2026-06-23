package com.glowlink.marketplace.Service.Impl;

import com.glowlink.marketplace.Model.ServiceOffering;
import com.glowlink.marketplace.Repository.ServiceOfferingRepository;
import com.glowlink.marketplace.Service.ServiceOfferingService;
import com.glowlink.marketplace.payload.dto.CategoryDTO;
import com.glowlink.marketplace.payload.dto.SalonDTO;
import com.glowlink.marketplace.payload.dto.ServiceDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class ServiceOfferingServiceImpl implements ServiceOfferingService {

    private ServiceOfferingRepository serviceOfferingRepository;

    @Override
    public ServiceOffering createService(SalonDTO salonDTO, ServiceDTO serviceDTO, CategoryDTO categoryDTO) {
        return null;
    }

    @Override
    public ServiceOffering updateService(Long serviceId, ServiceOffering service) {
        return null;
    }

    @Override
    public Set<ServiceOffering> getAllServicesBySalonId(Long salonId, Long categoryId) {
        return Set.of();
    }

    @Override
    public Set<ServiceOffering> getServicesByIds(Set<Long> ids) {
        return Set.of();
    }
}
