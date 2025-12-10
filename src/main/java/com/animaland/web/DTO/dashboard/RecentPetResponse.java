package com.animaland.web.DTO.dashboard;

public record RecentPetResponse(
        Long petId,
        String name,
        String species,
        String ownerName
) {}
