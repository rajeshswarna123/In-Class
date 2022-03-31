require('dotenv').config();
const express = require('express')
const res = require('express/lib/response')

const usersController = require('./controllers/users')

const app = express()
const port = process.env.PORT || 3000;

console.log(process.env);

app
    // .use('/', express.static('server/public/'))
    .use('/', express.static(__dirname +'/public/'))

    .use(express.json())

    .get('/api/', (req, res) =>{
        res.send('You are at the root of the API. For the best class ever - '+ process.env.BEST_CLASS_EVER)
    })
    .use('/api/users', usersController)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})