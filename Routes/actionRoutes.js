const express = require('express');

const actionDb = require('../data/helpers/actionModel.js');

const router = express.Router();

//CRUD routes (get/get, post/insert, put/update, delete/remove)
//action routes
//routes after: /actions

router.get('/', (req, res) => { //GET ALL ACTIONS
    
    actionDb
    .get()
    .then( actions => {
        res.json(actions);
    })
    .catch( error => {
        res.status(500).json({error: 'Chill dude something went wrong while trying to get you actions'})
    })
});

router.get('/:id', (req, res) => { // GET ACTION WITH THIS ID
    const { id } = req.params;

    actionDb
    .get(id)
    .then( action => {
        res.json(user[0]);
    })
    .catch( error => {
        res.status(500).json({error: `Chill dude something went wrong grabbing your action with ID: ${id}`})
    })
});

router.post('/', (req, res) => { // INSERT NEW ACTION
    const action = req.body;

    actionDb
    .insert(action)
    .then( response => {
        res.status(200).json(response)
    }
    )
    .catch( error => {
        res.status(500).json({error: 'Chill dude something went wrong'})
    })
});

router.put('/:id', (req, res) => { // UPDATE ACTION
    const { id } = req.params;
    const changes = req.body;

    actionDb
    .update(id, changes)
    .then( count => {
        if ( count > 0)  {
            actionDb.get(id).then( updatedAction => {
            res.status(200).json(updatedAction[0]) 
        })
        } else {
            res.status(404).json({error: 'User with that id cannot be found'})
        }
    })
    .catch( error => {
        res.status(500).json(error)
    })

});

router.delete('/:id', (req, res) => { //DELETE ACTION
    const { id } = req.params;
    let user;

    actionDb
    .get(id)
    .then ( response => {
        user = {...response[0]};

        actionDb
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