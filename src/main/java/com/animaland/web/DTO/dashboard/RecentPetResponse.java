package com.animaland.web.DTO.dashboard;

public class RecentPetResponse {

    private Long petId;
    private String name;
    private String species;
    private String ownerName;

    public RecentPetResponse(Long petId, String name, String species, String ownerName) {
        this.petId = petId;
        this.name = name;
        this.species = species;
        this.ownerName = ownerName;
    }

    public Long getPetId() { return petId; }
    public String getName() { return name; }
    public String getSpecies() { return species; }
    public String getOwnerName() { return ownerName; }
}
