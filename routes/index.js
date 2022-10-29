const express = require('express')
const userController = require('../controllers')
const api = express.Router()


api.post('/login', userController.signIn)
api.post('/register',userController.signUp)
api.get('/hi',userController.sayHi)




module.exports = api