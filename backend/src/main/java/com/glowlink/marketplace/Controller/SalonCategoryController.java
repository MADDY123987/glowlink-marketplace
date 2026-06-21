package com.glowlink.marketplace.Controller;


import com.glowlink.marketplace.Model.Category;
import com.glowlink.marketplace.Model.Salon;
import com.glowlink.marketplace.Service.CategoryService;
import com.glowlink.marketplace.payload.dto.SalonDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories/salon-owner")
@RequiredArgsConstructor
public class SalonCategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Category> createCategory(
            @RequestBody Category category
    ){
        SalonDTO salonDTO=new SalonDTO();
        salonDTO.setId(1L);
        Category Savedcategory=categoryService.saveCategory(category,salonDTO);
        return ResponseEntity.ok(Savedcategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(
            @PathVariable Long id
    ) throws Exception {
        SalonDTO salonDTO=new SalonDTO();
        salonDTO.setId(1L);
        categoryService.deleteCategoryById(id,salonDTO.getId());
        return ResponseEntity.ok("Category Deleted Successfully");
    }
}
