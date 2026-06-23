package com.glowlink.marketplace.Service.Impl;

import com.glowlink.marketplace.Model.Category;
import com.glowlink.marketplace.Repository.CategoryRepository;
import com.glowlink.marketplace.Service.CategoryService;
import com.glowlink.marketplace.payload.dto.SalonDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    @Override
    public Category saveCategory(Category category, SalonDTO salonDTO) {
        Category newcategory=new Category();
        newcategory.setName(category.getName());
        newcategory.setSalonId(category.getSalonId());
        newcategory.setImage(category.getImage());
        return categoryRepository.save(newcategory);
    }

    @Override
    public Set<Category> getAllCategoriesBySalon(Long id) {
        return categoryRepository.findBySalonId(id);
    }

    @Override
    public Category getCategoryById(Long id) throws Exception {
        Category category=categoryRepository.findById(id)
                .orElseThrow(()->new Exception("Category does not Exists with id"+id));
        return category;
    }

    @Override
    public void deleteCategoryById(Long id,Long salonId) throws Exception {
//        Category category = getCategoryById(id);
//        if (category.getSalonId().equals(salonId)) {
//            throw new Exception("You dont have permission to delete this Category");
//        }
        Category category = getCategoryById(id);
        categoryRepository.deleteById(id);
    }
}
