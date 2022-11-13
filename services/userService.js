const User = require("../models/user");
const signUp = () => {
  return new Promise((resolve, reject) => {
    User.findOne({ email }, (error, user) => {
      if (error) {
        reject(res.status(500).send("Hubo un error al registrarse", error));
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
  });
};

module.exports = {
  signUp,
};
