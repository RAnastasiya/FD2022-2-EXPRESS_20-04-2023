const express = require('express')
const yup = require('yup')
const users = [];
const app = express();

// parse json
app.use(express.json());

// validate
const validate = async (req, res, next) => { 
    try {
        const schemaValidUsers = yup.object({
            login: yup.string().trim().required(),
            email: yup.string().trim().email().required(),
            password: yup.string().trim().required()
        })
        req.body = await schemaValidUsers.validate(req.body)
        next()
    } catch (error) {
        res.send(error)
    }
}

// save 
const createUser = async (req, res) => {
    try {
        const user = req.body
        user.id = Date.now()
        user.createAt = new Date();
        user.password = 'password_hash';
        users.push(user) // db
        console.log(users)
        delete user.password
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// POST
app.post('/users', validate, createUser)

// GET
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
app.get('/users', (req, res) => {
    res.send('users')
})
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

const port = 3000;
app.listen(port, () => {
    console.log('server started at port = ', port)
});