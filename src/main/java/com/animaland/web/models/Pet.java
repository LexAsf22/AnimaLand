package com.animaland.web.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "pets")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long petId;

    private String name;
    private String species;
    private String breed;
    private int age;
    private String gender;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User owner;

    @OneToMany(mappedBy = "pet")
    private List<Appointment> appointments;

    public Long getPetId() { return petId; }
    public void setPetId(Long petId) { this.petId = petId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSpecies() { return species; }
    public void setSpecies(String species) { this.species = species; }

    public String getBreed() { return breed; }
    public void setBreed(String breed) { this.breed = breed; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }

    public List<Appointment> getAppointments() { return appointments; }
    public void setAppointments(List<Appointment> appointments) { this.appointments = appointments; }
}
