
const express = require("express");
const res = require("express/lib/response");
const app = express.Router();

const userModel = require(`../models/user`)

app
    .get('/', (req, res) => {
        res.send(userModel.list);
    })
    .get('/:id', (req, res)=>{
        const user = userModel.get(req.params.id);
        res.send(user)

    })

module.exports = app;