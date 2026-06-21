package com.glowlink.marketplace.Controller;

import com.glowlink.marketplace.Service.SalonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/salons")
@RequiredArgsConstructor
public class SalonController {
    private final SalonService salonService;
}
