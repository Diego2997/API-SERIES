const User = require("../models/user");
const { authServices, userService } = require("../services");

// ----------------CONSULTAR-------------------
const signIn = (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).send("El campo email es requerido");
  }
  User.findOne({ email }, (error, user) => {
    if (error) {
      return res.status(500).send("Hubo un error", error);
    }
    if (!user) {
      //TODO
      return res
        .status(400)
        .send({ message: "No se encontro un usuario con el email ingresado" });
    }
    if (!(password && user.comparePassword(password))) {
      res
        .status(401)
        .send({ message: "El usuario o la clave son incorrectos" });
    }
    res.status(200).send({
      message: "Te has logueado correctamente",
      token: authServices.createToken(user),
    });
  });
};

// ---------CREAR---------------------------------
const signUp = (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({
    email,
    password,
  });
  if (!newUser.email) {
    return res.status(403).send({ message: "el campo email es requerido" });
  } else if (!newUser.password) {
    return res.status(403).send({ message: "el campo password es requerido" });
  }

  userService.signUp(newUser);
};

const sayHi = (req, res) => {
  res.status(200).send({ message: `Hola usuario con id ${req.user}` });
};

module.exports = {
  signIn,
  signUp,
  sayHi,
};
