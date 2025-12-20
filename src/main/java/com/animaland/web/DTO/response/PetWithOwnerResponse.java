
package com.animaland.web.DTO.response;

public class PetWithOwnerResponse {

    private Long petId;
    private String name;
    private String species;

    private Long ownerId;
    private String ownerFirstName;
    private String ownerLastName;
    private String ownerEmail;
    private String ownerPhone;

    public PetWithOwnerResponse(
            Long petId,
            String name,
            String species,
            Long ownerId,
            String ownerFirstName,
            String ownerLastName,
            String ownerEmail,
            String ownerPhone
    ) {
        this.petId = petId;
        this.name = name;
        this.species = species;
        this.ownerId = ownerId;
        this.ownerFirstName = ownerFirstName;
        this.ownerLastName = ownerLastName;
        this.ownerEmail = ownerEmail;
        this.ownerPhone = ownerPhone;
    }

    public Long getPetId() { return petId; }
    public String getName() { return name; }
    public String getSpecies() { return species; }

    public Long getOwnerId() { return ownerId; }
    public String getOwnerFirstName() { return ownerFirstName; }
    public String getOwnerLastName() { return ownerLastName; }
    public String getOwnerEmail() { return ownerEmail; }
    public String getOwnerPhone() { return ownerPhone; }
}
