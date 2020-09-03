const route = require('express').Router()
const userController = require('../controllers/userController')
const GoogleLogin = require('../controllers/googleLoginController')
// const authentication = require('../middlewares/auth')

route.post('/login' ,userController.login)
route.post('/register', userController.register)
route.post('/google-login', GoogleLogin.verifyLogin)



module.exports = route