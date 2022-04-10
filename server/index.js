require('dotenv').config();
const express = require('express')
const res = require('express/lib/response')

const usersController = require('./controllers/users')
const postsController = require('./controllers/posts');
const userModel= require('./models/user');

const { requireAuth } = require('./models/auth');

const app = express()
const port = process.env.PORT || 3000;

// console.log(process.env);

app
    // .use('/', express.static('server/public/'))
    .use('/', express.static(__dirname +'/public/'))

    .use(express.json())

    .use((req, res, next) => {
        const auth = req.headers.authorization;
        if(auth){
            const token = auth.split(' ')[1];
            userModel.fromToken(token)
                .then(user => {
                  req.user = user;
                  next();
                }).catch(next);
        } else {
            next();
        }
    })

    .get('/api/', (req, res) =>{
        res.send('You are at the root of the API. For the best class ever - '+ process.env.BEST_CLASS_EVER)
    })
    .use('/api/users', usersController)
    .use('/api/posts', requireAuth, postsController)

    .use((err, req, res, next) => {
      console.error(err);
      res .status(err.statusCode || 500)
            .send({ errors: [ err.message ?? 'Internal server error' ] });
    })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})