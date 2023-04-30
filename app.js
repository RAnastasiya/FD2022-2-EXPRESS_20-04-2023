const express = require('express')
const validate = require('./middlewares/validate.mw')
const UserController = require('./controllers/user.controller')

const app = express();
app.use(express.json());

// POST
app.post('/users', validate, UserController.create)

// GET
app.get('/users',  UserController.getAll);

app.get('/users/:id/:prop', (req, res) => {
    console.log(req.params)
    res.send(req.params.prop)
})
app.get('/',
    (req, res, next) => {
        req.test = 12
        console.log(1)
        next()
    },
    (req, res, next) => {
        req.test += 5
        console.log(2)
        next()
    },
    (req, res) => {
        console.log(req.test)
        res.send('<h1>home</h1>')
    }
)
app.get('*', (req, res) => {
    // res.send('method: ' + req.method + ', url: ' + req.path)
    res.send('404')
})

// PUT
app.put('/users', validate, (req, res) => {

})

// DELETE
app.delete('/', (req, res) => {

})

module.exports = app;