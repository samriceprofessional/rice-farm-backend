const getAnimals = "SELECT * from animal_bio";
const getType = "Select * from animal_type"
const getAnimalById = "SELECT * from animal_bio WHERE id = $1";
const getTypeById = "SELECT * from animal_type WHERE id = $1";

const join = "SELECT * FROM animal_bio LEFT JOIN animal_type on animal_type.id = animal_bio.type"
const selectAnimalByNameAndJoin = "SELECT * FROM animal_bio LEFT JOIN animal_type on animal_type.id = animal_bio.type where animal_bio.name = $1";

const checkNameExists = "SELECT a from animal_bio a WHERE a.name = $1";
const addAnimal = "INSERT INTO animal_bio(name,sex, type, description, image, age, acquisition_date) VALUES ($1, $2, $3, $4, $5, $6,$7)";
const updateAnimal = "UPDATE animal_bio SET name = $1 WHERE id = $2"
const removeAnimal = "DELETE FROM animal_bio WHERE id = $1";

const orderNameASC = "SELECT * FROM animal_bio LEFT JOIN animal_type on animal_type.id = animal_bio.type order by name ASC";
const orderNameDESC = "SELECT * FROM animal_bio LEFT JOIN animal_type on animal_type.id = animal_bio.type order by name DESC";

const searchForAnimal = `SELECT name, ab.sex , species , breed, ab.image, ab.age, description, 
ts_rank(to_tsvector(name || ' ' || ab.sex || ' ' || species || ' ' || breed || ' ' || ab.age || ' ' || 
					description ),  to_tsquery('english',$1)) as rank
from animal_bio ab
LEFT JOIN animal_type aat
on aat.id = ab.type
 
where to_tsvector( name || ' ' || sex || ' ' || species 
|| ' ' || breed || ' ' || description)	@@  to_tsquery('english',$1) `;

const filters = [
    'order by name asc',
    'order by name desc'
]
 
module.exports = {
    getAnimals,
    getAnimalById,
    checkNameExists,
    addAnimal,
    removeAnimal, updateAnimal, getType, getTypeById, join, selectAnimalByNameAndJoin,orderNameASC, orderNameDESC, searchForAnimal,searchForAnimal, filters
}