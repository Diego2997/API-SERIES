const { check } = require("express-validator");

module.exports = [
  check("email")
    .isEmail()
    .notEmpty()
    .withMessage("el campo email es requerido")
    .isString()
    .custom((value, {}) => value.includes("@") && value.includes(".com"))
    .withMessage("el email ingresado no es valido"),

  check("password")
    .exists()
    .notEmpty()
    .withMessage("El campo password es requerido")
    .isLength({ min: 4, max: 16 })
    .withMessage(
      "La contraseña debe tener un minimo de 4 caracteres y maximo 16"
    ),
];
