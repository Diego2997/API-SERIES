const express = require("express");
const api = express.Router();

// CONTROLLERS
const { userController, productController } = require("../controllers");

// SCHEMAS
const { userSchema } = require("../controllers/schemas");

// AUTH TOKEN
const { isAuth } = require("../middlewares");

api.post("/login", userController.signIn);
api.post("/register", userSchema, userController.signUp);
api.get("/hi", isAuth, userController.sayHi);

api.post("/product", productController.createProduct);

module.exports = api;
