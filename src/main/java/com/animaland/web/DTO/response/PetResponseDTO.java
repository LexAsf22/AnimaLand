package com.animaland.web.DTO.response;

public class PetResponseDTO {

    private Long petId;
    private String name;
    private String species;
    private String breed;
    private int age;
    private String gender;

    private Long ownerId;
    private String ownerName;

    // ✅ REQUIRED: No-args constructor
    public PetResponseDTO() {
    }

    // ✅ Optional: All-args constructor (for JPQL projections, etc.)
    public PetResponseDTO(
            Long petId,
            String name,
            String species,
            String breed,
            int age,
            String gender,
            Long ownerId,
            String ownerName
    ) {
        this.petId = petId;
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.age = age;
        this.gender = gender;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
    }

    // ✅ Getters
    public Long getPetId() { return petId; }
    public String getName() { return name; }
    public String getSpecies() { return species; }
    public String getBreed() { return breed; }
    public int getAge() { return age; }
    public String getGender() { return gender; }
    public Long getOwnerId() { return ownerId; }
    public String getOwnerName() { return ownerName; }

    // ✅ Setters (THIS FIXES YOUR ERROR)
    public void setPetId(Long petId) { this.petId = petId; }
    public void setName(String name) { this.name = name; }
    public void setSpecies(String species) { this.species = species; }
    public void setBreed(String breed) { this.breed = breed; }
    public void setAge(int age) { this.age = age; }
    public void setGender(String gender) { this.gender = gender; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
}
