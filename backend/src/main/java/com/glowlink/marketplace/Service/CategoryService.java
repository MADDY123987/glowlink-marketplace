package com.glowlink.marketplace.Service;

import com.glowlink.marketplace.Model.Category;
import com.glowlink.marketplace.Model.Salon;
import com.glowlink.marketplace.payload.dto.SalonDTO;

import java.util.Set;

public interface CategoryService {
    Category saveCategory(Category category, SalonDTO salonDTO);
    Set<Category> getAllCategoriesBySalon(Long id);
    Category getCategoryById(Long id) throws Exception;
    void deleteCategoryById(Long id,Long salonId) throws Exception;

}
