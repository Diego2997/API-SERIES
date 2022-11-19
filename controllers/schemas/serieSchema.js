const { check } = require("express-validator");
module.exports = [
  check("title")
    .exists()
    .notEmpty()
    .withMessage("el campo title es requerido")
    .isString()
    .withMessage("El campo ingresado no es un String"),

  check("desription")
    .exists()
    .notEmpty()
    .isString()
    .withMessage("El campo ingresado no es un String"),

  check("url")
    .exists()
    .notEmpty()
    .withMessage("El campo url es requerido")
    .isString()
    .withMessage("El campo ingresado no es un String"),

  check("category")
    .exists()
    .notEmpty()
    .withMessage("El campo category es requerido")
    .isString()
    .withMessage("El campo ingresado no es un String"),
];
