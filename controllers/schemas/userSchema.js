const { check } = require("express-validator");

module.exports = [
  check("email")
    .notEmpty()
    .withMessage("el campo email es requerido")
    .custom((value, {}) => value.includes("@") && value.includes(".com"))
    .withMessage("el email ingresado no es valido"),

  check("password"),
];
