const User = require("../models/User");

module.exports.create = async (req, res) => {
    try {
        const {body} = req
        const user = await new User(body)
        delete user.password
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports.getAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users)
    } catch (error) {
        res.status(404).send(error.message)
    }
};

