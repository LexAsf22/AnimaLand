package com.animaland.web.DTO.dashboard;

public class RecentPetResponse {

    private Long petId;
    private String petName;
    private String species;
    private String ownerName;

    // ✅ Constructor used in JPQL query
    public RecentPetResponse(Long petId, String petName, String species, String ownerName) {
        this.petId = petId;
        this.petName = petName;
        this.species = species;
        this.ownerName = ownerName;
    }

    // ✅ Getters and Setters
    public Long getPetId() { return petId; }
    public void setPetId(Long petId) { this.petId = petId; }

    public String getPetName() { return petName; }
    public void setPetName(String petName) { this.petName = petName; }

    public String getSpecies() { return species; }
    public void setSpecies(String species) { this.species = species; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
}
