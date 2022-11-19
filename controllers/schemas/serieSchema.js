const { check } = require("express-validator");
module.exports = [
  check("title")
    .notEmpty()
    .withMessage("el campo title es requerido")
    .isString()
    .withMessage("El campo title debe ser un String"),

  check("description")
    .notEmpty()
    .withMessage("El campo desription es requerido")
    .isString()
    .withMessage("El campo description debe ser un String"),

  check("url")
    .notEmpty()
    .withMessage("El campo url es requerido")
    .isString()
    .withMessage("El campo url debe ser un String"),

  check("category")
    .notEmpty()
    .withMessage("El campo category es requerido")
    .isString()
    .withMessage("El campo category debe ser un String"),
];
