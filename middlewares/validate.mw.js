const yup = require('yup')

const schemaValidUsers = yup.object({
    login: yup.string().trim().required(),
    email: yup.string().trim().email().required(),
    password: yup.string().trim().required()
})

module.exports = async (req, res, next) => { 
    try {
        req.body = await schemaValidUsers.validate(req.body)
        next()
    } catch (error) {
        res.status(400).send(error)
    }
}