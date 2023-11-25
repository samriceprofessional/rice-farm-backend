
const { response } = require('express');
const pool = require('../../db');


const queries = require('./queries');

const getAnimals = (req, res) => {
    pool.query(queries.getAnimals, (error, results) => {
        if (error) throw error;

        res.status(200).json(results.rows);
    })
}
const join = (req, res) => {
    pool.query(queries.join, (error, results) => {
        if (error) throw error;

        res.status(200).json(results.rows);
    })
}

const order = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    
    switch (id) {
        case 0:
            pool.query(queries.orderNameASC, (error, results) => {
                if (error) throw error;

                res.status(200).json(results.rows);
            })
            break;
        case 1:
            pool.query(queries.orderNameDESC , (error, results) => {
                if (error) throw error;

                res.status(200).json(results.rows);
            })
            break;
    }
}
const getType = (req, res) => {
    pool.query(queries.getType, (error, results) => {
        if (error) throw error;

        res.status(200).json(results.rows);
    })
}

const search = (req, res) => {
    let trimmedSearch = req.params.search.trim();
    let searchArray = trimmedSearch.split(/\s+/);
    let searchWithStar = searchArray.join(' & ') + ':*'
     
    let id = req.params.id;
    let statement = queries.filters[id];
    pool.query(queries.searchForAnimal + statement, [searchWithStar], (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}
const getAnimalById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getAnimalById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}
const selectAnimalByNameAndJoin = (req, res) => {
    const name = req.params.name;
     
    pool.query(queries.selectAnimalByNameAndJoin, [name], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}
const getTypeById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getTypeById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}
const addAnimal = (req, res) => {
    const { name, sex, type, description, image, age, acquisition_date } = req.body;

    //check if name exists

    pool.query(queries.checkNameExists, [name], (error, results) => {

        if (results.rows.length) {
            res.send("Name already Exists")
        }

        pool.query(queries.addAnimal, [name, sex, type, description, image, age, acquisition_date], (error, results) => {
            if (error) throw error;

            res.status(201).send("Animal Created Successfully")
        })
    })
}


const removeAnimal = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getAnimalById, [id], (error, results) => {
        const noAnimal = !results.rows.length;

        if (noAnimal) {
            res.send("Animal not found, couldn't remove");
        } else {
            pool.query(queries.removeAnimal, [id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Animal removed successfully");
            })
        }
    })
}

const updateAnimal = (req, res) => {
    const id = parseInt(req.params.id);

    const { name } = req.body;

    pool.query(queries.getAnimalById, [id], (error, response) => {
        const noAnimal = !results.rows.length;

        if (noAnimal) {
            res.send("Animal not found, couldn't edit");
        }

        pool.query(queries.updateAnimal, [name, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Animal update successfully");
        })
    })
}
module.exports = {
    getAnimals,
    getAnimalById,
    addAnimal,
    removeAnimal,
    updateAnimal,
    getType,
    getTypeById,
    join,
    selectAnimalByNameAndJoin,
    order,
    search
}