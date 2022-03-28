
const express = require("express");
const { use } = require("express/lib/application");
const res = require("express/lib/response");
const app = express.Router();

const userModel = require(`../models/user`)

const CREATED_STATUS = 201;

app
    .get('/', (req, res) => {
        // res.send(userModel.list());
        res.send(userModel.list);
    })
    .get('/:id', (req, res)=>{
        const user = userModel.get(req.params.id);
        res.send(user)

    })
    .post('/', (req, res) => {
        const user = userModel.create(req.body);
        res.status(CREATED_STATUS).send(user);
    })
    .delete('/:id', (req, res)=>{
        const user = userModel.remove(req.params.id);
        res.send({sucess: true, errors: [], data: user});
    })
    .patch('/:id', (req, res)=>{
        const user = userModel.update(req.params.id, req.body);
        res.send({sucess: true, errors: [], data: user});
    })

module.exports = app;