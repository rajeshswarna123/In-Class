
const express = require("express");
const { use } = require("express/lib/application");
const res = require("express/lib/response");
const app = express.Router();
const { requireAuth } = require("../models/auth")
const userModel = require(`../models/user`)

const CREATED_STATUS = 201;

app
    .get('/', requireAuth, (req, res, next) => {
        userModel.getList()
        .then(users => {
            res.send({ success: true, errors: [], data: users });
        }).catch(next);
        //res.send(userModel.list);
    })
    .get('/handle/:handle', (req, res, next) => {
        userModel.getByHandle(req.params.handle)
        .then(user => {
            res.send({ success: true, errors: [], data: user });
        }).catch(next);
        //const user = userModel.get(req.params.id);
        //res.send(user);

    })
    .get('/:id', (req, res, next) => {
        userModel.get(req.params.id)
        .then(user => {
            res.send({ success: true, errors: [], data: user });
        }).catch(next);
        //const user = userModel.get(req.params.id);
        //res.send(user);

    })
    .post('/', (req, res,next) => {
        userModel.create(req.body)
        .then(user => {
            res.status(CREATED_STATUS).send({ success: true, errors: [], data: user });
        }).catch(next);
    })
    .delete('/:id', requireAuth, (req, res, next) => {
        const user = userModel.remove(req.params.id);
        userModel.remove(req.params.id)
        .then(user => {
            res.send({ success: true, errors: [], data: user });
        }).catch(next);
        //const user = userModel.remove(req.params.id);
        //res.send({ success: true, errors: [], data: user });

    })
    .patch('/:id', (req, res)=>{
        const user = userModel.update(req.params.id, req.body);
        res.send({sucess: true, errors: [], data: user});
    })
    .post('/login', (req, res, next) => {
        userModel.login(req.body.email, req.body.password)
        .then(user => {
            res.send({ success: true, errors: [], data: user });
        }).catch(next);
    })
    .post('/seed', (req, res, next) => {
        userModel.seed()
        .then(x => {
            res.send({ success: true, errors: [], data: x.insertedIds });
        }).catch(next);
    })

module.exports = app;