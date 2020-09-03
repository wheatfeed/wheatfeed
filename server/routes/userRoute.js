const route = require('express').Router()
const userController = require('../controllers/userController')
// const authentication = require('../middlewares/auth')

route.post('/login' ,userController.login)
route.post('/register', userController.register)


module.exports = route