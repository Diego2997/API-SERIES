const User = require("../models/user");
const { authServices } = require("../services");

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

  User.findOne({ email }, (error, user) => {
    if (error) {
      return res.status(500).send("Hubo un error al registrarse", error);
    }
    if (user) {
      return res
        .status(400)
        .send({ message: "El email ya se encuentra en uso" });
    }
    const newUser = new User({
      email: email,
      password: password,
    });
    newUser.save((error) => {
      if (error) {
        return res.status(500).send(`Se produjo un error, ${error}`);
      }
      res.status(200).send({
        message: "Te has registrado correctamente",
        token: authServices.createToken(newUser),
      });
    });
  });
};

const sayHi = (req, res) => {
  res.status(200).send({ message: `Hola usuario con id ${req.user}` });
};

module.exports = {
  signIn,
  signUp,
  sayHi,
};
