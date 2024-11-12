package petadoption.api.recommendationEngine;

import petadoption.api.pet.Pet;

public class DistancePet {
    private Pet pet;
    private int distance;

    public DistancePet(Pet pet, int distance) {
        this.pet = pet;
        this.distance = distance;
    }

    public Pet getPet() {
        return pet;
    }

    public int getDistance() {
        return distance;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public void setDistance(int distance) {
        this.distance = distance;
    }
}
