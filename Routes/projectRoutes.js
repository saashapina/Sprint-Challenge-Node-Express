const express = require('express');

const projectDb = require('../data/helpers/projectModel.js');

const router = express.Router();

//CRUD routes (get/get, post/insert, put/update, delete/remove)
//project routes
//routes after: /projects

router.get('/', (req, res) => { //GET ALL PROJECTS
    
    projectDb
    .get()
    .then( projects => {
        res.json(projects);
    })
    .catch( error => {
        res.status(500).json({error: 'Chill dude something went wrong while trying to get you projects'})
    })
});

router.get('/:id', (req, res) => { // GET PROJECT WITH THIS ID 
    const { id } = req.params;

    projectDb
    .get(id)
    .then( project => {
        res.json(user[0]);
    })
    .catch( error => {
        res.status(500).json({error: `Chill dude something went wrong grabbing your project with ID: ${id}`})
    })
});

router.post('/', (req, res) => { // INSERT NEW PROJECT
    const project = req.body;
    
    projectDb
    .insert(project)
    .then( response => {
        res.status(200).json(response)
    }
    )
    .catch( error => {
        res.status(500).json({error: 'Chill dude something went wrong'})
    })
});

router.put('/:id', (req, res) => { // UPDATE PROJECT
    const { id } = req.params;
    const changes = req.body;

    projectDb
    .update(id, changes)
    .then( count => {
        if ( count > 0)  {
            projectDb.get(id).then( updatedProject => {
            res.status(200).json(updatedProject[0]) 
        })
        } else {
            res.status(404).json({error: 'User with that id cannot be found'})
        }
    })
    .catch( error => {
        res.status(500).json(error)
    })

});

router.delete('/:id', (req, res) => { //DELETE PROJECT
    const { id } = req.params;
    let user;

    projectDb
    .get(id)
    .then ( response => {
        user = {...response[0]};

        projectDb
        .remove(id)
        .then( response => {
            res.status(200).json(response)
        })
        .catch( error => {
            res.status(500).json(error);
        });

    })
    .catch ( error => {
        res.status(500).json(error);
    })
    

});

module.exports = router;