const { check } = require("express-validator");
module.exports = [
  check("title")
    .exists()
    .notEmpty()
    .withMessage("el campo title es requerido")
    .isString()
    .withMessage("El campo ingresado debe ser un String"),

  check("description")
    .exists()
    .notEmpty()
    .withMessage("El campo description es requerido")
    .isString()
    .withMessage("El campo ingresado debe ser un String"),

  check("video")
    .exists()
    .notEmpty()
    .withMessage("El campo video es requerido")
    .isString()
    .withMessage("El campo ingresado debe ser un String"),
];
