package com.glowlink.marketplace.Service;

import com.glowlink.marketplace.Model.Category;
import com.glowlink.marketplace.Model.ServiceOffering;
import com.glowlink.marketplace.payload.dto.CategoryDTO;
import com.glowlink.marketplace.payload.dto.SalonDTO;
import com.glowlink.marketplace.payload.dto.ServiceDTO;

import java.util.Set;

public interface ServiceOfferingService {
    ServiceOffering createService(SalonDTO salonDTO,
                                  ServiceDTO serviceDTO,
                                  CategoryDTO categoryDTO);
    ServiceOffering updateService(Long serviceId,ServiceOffering service) throws Exception;
    Set<ServiceOffering> getAllServicesBySalonId(Long salonId,Long categoryId);
    Set<ServiceOffering> getServicesByIds(Set<Long>ids);
    ServiceOffering getServiceById(Long id) throws Exception;

}
