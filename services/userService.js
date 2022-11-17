const User = require("../models/user");
const authServices = require("./authServices");

const signUp = (email, password) => {
  return new Promise((resolve, reject) => {
    const newUser = new User({
      email,
      password,
    });
    User.findOne({ email: newUser.email }, (error, user) => {
      if (error) {
        reject({ status: 500, message: "hubo un error al registrarse" });
      }
      if (user) {
        reject({ status: 403, message: "el email ya se encuentra en uso" });
      }

      newUser.save((error) => {
        if (error) {
          reject({ status: 500, message: "se produjo un error " });
        }
        resolve({
          status: 200,
          message: "Te has registrado correctamente",
          token: authServices.createToken(newUser),
        });
      });
    });
  });
};

const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email }, (error, user) => {
      if (error) {
        reject({ status: 500, send: "Hubo un error", error });
      }
      if (!user) {
        reject({
          status: 400,
          message: "No se encontro un usuario con el email ingresado",
        });
      }
      if (!(password && user.comparePassword(password))) {
        reject({
          status: 401,
          message: "El usuario o la clave son incorrectos",
        });
      }
      resolve({
        status: 200,
        message: "Te has logueado correctamente",
        token: authServices.createToken(user),
      });
    });
  });
};

module.exports = {
  signUp,
  signIn,
};
