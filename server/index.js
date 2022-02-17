const express = require('express')

const app = express()
const port = 3000

app
    .get('/', (req, res) => {
        res.send('You are on the homepage');
    })
    .get('/about', (req, res) => {
        res.send('You are on the about page');
    })
    .get('/contact', (req, res) => {
        res.send({
            email: 'swarnar1@newpaltz.edu',
            phone:'845-750-8121',
            twitter: 'notwitter',   
            instagram: 'rajesh_swarna'
        });
      })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})