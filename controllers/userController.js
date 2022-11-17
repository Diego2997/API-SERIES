const { userService } = require("../services");
const { validationResult } = require("express-validator");

// ----------------CONSULTAR-------------------
const signIn = async (req, res) => {
  try {
    const resultValidationReq = validationResult(req);
    const hasError = !resultValidationReq.isEmpty();

    if (hasError) {
      console.log("hay un error");
      return res.status(400).send(resultValidationReq);
    }
    const { email, password } = req.body;

    //RESOLVIENDO CON ASYNC AWAIT
    // const result = await userService
    //   .signUp(email, password)
    //   .catch((error) => error);
    // res.status(result.status).send(result);

    //RESOLVIENDO CON PROMESAS
    userService
      .signIn(email, password)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

// ---------CREAR---------------------------------
const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultValidationReq = validationResult(req);
    const hasError = !resultValidationReq.isEmpty();

    if (hasError) {
      console.log("hay un error");
      return res.status(400).send(resultValidationReq);
    }

    //RESOLVIENDO CON ASYNC AWAIT
    // const result = await userService
    //   .signUp(email, password)
    //   .catch((error) => error);
    // res.status(result.status).send(result);

    //RESOLVIENDO CON PROMESAS
    userService
      .signUp(email, password)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

const sayHi = (req, res) => {
  res.status(200).send({ message: `Hola usuario con id ${req.user}` });
};

module.exports = {
  signIn,
  signUp,
  sayHi,
};
