package com.glowlink.marketplace.Controller;

import com.glowlink.marketplace.Model.Category;
import com.glowlink.marketplace.Service.CategoryService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/salon/{id}")
    public ResponseEntity<Set<Category>> getCategoriesBySalon(
            @PathVariable Long id
    ){
        Set<Category> categories=categoryService.getAllCategoriesBySalon(id);
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/salon/{id}")
    public ResponseEntity <Category> getCategoryById(
            @PathVariable Long id
    ) throws Exception {
        Category categories=categoryService.getCategoryById(id);
        return ResponseEntity.ok(categories);
    }

}
