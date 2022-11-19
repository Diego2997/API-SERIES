const express = require("express");
const api = express.Router();

// CONTROLLERS
const {
  userController,
  serieController,
  chapterController,
} = require("../controllers");

// SCHEMAS
const {
  userSchema,
  chapterSchema,
  serieSchema,
} = require("../controllers/schemas");

// AUTH TOKEN
const { isAuth } = require("../middlewares");

api.post("/login", userController.signIn);
api.post("/register", userSchema, userController.signUp);
api.get("/hi", isAuth, userController.sayHi);

api.get("/serie", serieController.getSeries);
api.get("/serie/:id", serieController.getOneSerie);
api.post("/serie", serieController.createSerie);
api.put("/serie/:id", serieController.updateSerie);
api.delete("/serie/:id", serieController.deleteSerie);

api.get("/chapter", chapterController.getChapters);
api.post("/chapter", serieSchema, chapterController.createChapter);
api.put("/chapter/:id", chapterController.updateChapter);
api.delete("/chapter/:id", chapterController.deleteChapter);

module.exports = api;
