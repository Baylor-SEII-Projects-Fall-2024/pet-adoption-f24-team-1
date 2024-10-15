USE petadoption;

DELETE FROM event;

INSERT INTO pet (petID, pet_name, pet_breed, pet_gender, pet_age, pet_weight, pet_species, color)
VALUES (1, 'Buddy', 'Golden Retriever', 'Male', 3, 30, 'Dog', 'Golden');

INSERT INTO pet (petID, pet_name, pet_breed, pet_gender, pet_age, pet_weight, pet_species, color)
VALUES (2, 'Whiskers', 'Siamese', 'Female', 2, 10, 'Cat', 'Cream');

INSERT INTO pet (petID, pet_name, pet_breed, pet_gender, pet_age, pet_weight, pet_species, color)
VALUES (3, 'Tweety', 'Canary', 'Female', 1, 0.05, 'Bird', 'Yellow');

INSERT INTO pet (petID, pet_name, pet_breed, pet_gender, pet_age, pet_weight, pet_species, color)
VALUES (4, 'Max', 'Beagle', 'Male', 5, 20, 'Dog', 'Tricolor');

INSERT INTO pet (petID, pet_name, pet_breed, pet_gender, pet_age, pet_weight, pet_species, color)
VALUES (5, 'Bella', 'Maine Coon', 'Female', 4, 15, 'Cat', 'Gray');
