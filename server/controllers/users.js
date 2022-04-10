
const express = require("express");
const { use } = require("express/lib/application");
const res = require("express/lib/response");
const app = express.Router();
const { requireAuth } = require("../models/auth")
const userModel = require(`../models/user`)

const CREATED_STATUS = 201;

app
    .get('/', requireAuth, (req, res) => {
        // res.send(userModel.list());
        res.send(userModel.list);
    })
    .get('/:id', (req, res)=>{
        const user = userModel.get(req.params.id);
        res.send(user)

    })
    .post('/', requireAuth, (req, res) => {
        userModel.create(req.body)
        .then(user => {
            res.status(CREATED_STATUS).send(user);
        }).catch(next);
    })
    .delete('/:id', (req, res)=>{
        const user = userModel.remove(req.params.id);
        res.send({sucess: true, errors: [], data: user});
    })
    .patch('/:id', (req, res)=>{
        const user = userModel.update(req.params.id, req.body);
        res.send({sucess: true, errors: [], data: user});
    })
    .post('/login', (req, res, next) => {
        userModel.login(req.body.email, req.body.password)
        .then(user => {
            res.send(user);
        }).catch(next);
    })

module.exports = app;