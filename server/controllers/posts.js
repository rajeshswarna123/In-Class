const express = require('express');
const app = express.Router();

const postModel = require('../models/post');

const CREATED_STATUS = 201;

app
    .get('/', (req, res) => {
        res.send(postModel.list);
    })
    .get('/wall', (req, res) => {
        res.send(postModel.list.filter(post => post.owner === req.user.id));
    })
    .get('/:id', (req, res) => {

        const post = postModel.get(req.params.id);
        res.send(post);

    })
    .post('/', (req, res) => {
        const post = postModel.create(req.body);
        res.status(CREATED_STATUS).send(post);
    })
    .delete('/:id', (req, res) => {

        const post = postModel.remove(req.params.id);

        res.send({ success: true, errors: [], data: post });

    })
    .patch('/:id', (req, res) => {

        const post = postModel.update(req.params.id, req.body );

        res.send({ success: true, errors: [], data: post });

    })



module.exports = app;