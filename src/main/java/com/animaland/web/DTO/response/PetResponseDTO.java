package com.animaland.web.DTO.response;

import java.util.List;
import com.animaland.web.DTO.TreatmentRecordDTO;

public class PetResponseDTO {

    private Long petId;
    private String name;
    private String species;
    private String breed;
    private int age;
    private String gender;

    private Long ownerId;
    private String ownerName;

    private List<TreatmentRecordDTO> treatmentRecords;

    public PetResponseDTO() {}

    public PetResponseDTO(Long petId, String name, String species, String breed, int age, String gender,
                          Long ownerId, String ownerName) {
        this.petId = petId;
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.age = age;
        this.gender = gender;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
    }

    public PetResponseDTO(Long petId, String name, String species, String breed, int age, String gender,
                          Long ownerId, String ownerName, List<TreatmentRecordDTO> treatmentRecords) {
        this.petId = petId;
        this.name = name;
        this.species = species;
        this.breed = breed;
        this.age = age;
        this.gender = gender;
        this.ownerId = ownerId;
        this.ownerName = ownerName;
        this.treatmentRecords = treatmentRecords;
    }

    // Getters
    public Long getPetId() { return petId; }
    public String getName() { return name; }
    public String getSpecies() { return species; }
    public String getBreed() { return breed; }
    public int getAge() { return age; }
    public String getGender() { return gender; }
    public Long getOwnerId() { return ownerId; }
    public String getOwnerName() { return ownerName; }
    public List<TreatmentRecordDTO> getTreatmentRecords() { return treatmentRecords; }

    // Setters
    public void setPetId(Long petId) { this.petId = petId; }
    public void setName(String name) { this.name = name; }
    public void setSpecies(String species) { this.species = species; }
    public void setBreed(String breed) { this.breed = breed; }
    public void setAge(int age) { this.age = age; }
    public void setGender(String gender) { this.gender = gender; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
    public void setTreatmentRecords(List<TreatmentRecordDTO> treatmentRecords) { this.treatmentRecords = treatmentRecords; }
}
