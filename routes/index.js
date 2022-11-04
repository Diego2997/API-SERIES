const express = require("express");
const { userController } = require("../controllers");
const { isAuth } = require("../middlewares");
const api = express.Router();

api.post("/login", userController.signIn);
api.post("/register", userController.signUp);
api.get("/hi", isAuth, userController.sayHi);

module.exports = api;
