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
  serieSchema,
  chapterSchema,
} = require("../controllers/schemas");

// AUTH TOKEN
const { isAuth } = require("../middlewares");

api.post("/login", userController.signIn);
api.post("/register", userSchema, userController.signUp);
api.get("/hi", isAuth, userController.sayHi);

api.get("/serie", serieController.getSeries);
api.get("/serie/:id", serieController.getOneSerie);
api.post("/serie", serieSchema, serieController.createSerie);
api.put("/serie/:id", serieSchema, serieController.updateSerie);
api.delete("/serie/:id", serieController.deleteSerie);

api.get("/:title", chapterController.getChapters);
api.post("/chapter", chapterSchema, chapterController.createChapter);
api.put("/chapter/:id", chapterSchema, chapterController.updateChapter);
api.delete("/chapter/:id", chapterController.deleteChapter);

module.exports = api;
