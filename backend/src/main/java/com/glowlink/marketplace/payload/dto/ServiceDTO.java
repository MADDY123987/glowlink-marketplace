package com.glowlink.marketplace.payload.dto;

import jakarta.persistence.Column;

public class ServiceDTO {
    private Long id;

    private String name;

    private String description;

    private int price;

    private int duration;

    private Long salonId;

    private Long categoryId;

    private String image;

}
