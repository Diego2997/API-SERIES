const { authServices } = require("../services");

const isAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: "El usuario no esta logueado " });
    }

    const token = req.headers.authorization.split(" ")[1];
    const response = await authServices.decodeToken(token);
    req.user = response;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = isAuth;
