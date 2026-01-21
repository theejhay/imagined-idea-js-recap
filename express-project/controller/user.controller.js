const userService = require("../service/user.service");

const getUsers = (req, res) =>{
    const users = userService.getAll();
    res.json({
        success: true,
        data: users
    })
}

const createUser = (req, res) => {
    const user = userService.createUser(req.body);
    res.status(201).json({
        success: true,
        data: user
    });
}

module.exports = {
    getUsers, createUser
}