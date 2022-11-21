const Serie = require("../models/serie");
const User = require("../models/user");

const getSeries = () => {
  return new Promise((resolve, reject) => {
    Serie.find({}, (error, result) => {
      if (error) {
        reject(error);
      }
      const { title, description, url } = result;
      resolve(result);
    });
  });
};

const getOneSerie = (id) => {
  return new Promise((resolve, reject) => {
    Serie.findOne({ _id: id }, (error, result) => {
      if (error) {
        reject(error);
      }
      if (!result) {
        reject({
          status: 500,
          message: "no se encontro la serie",
        });
      }
      resolve(result);
    });
  });
};
const updateSerie = (id, title, description, url, category) => {
  return new Promise((resolve, reject) => {
    Serie.findByIdAndUpdate(
      { _id: id },
      { title, description, url, category },
      (error, result) => {
        if (error) {
          reject(error);
        }
        if (!result) {
          reject();
        }
        resolve();
      }
    );
  });
};

const deleteSerie = (id) => {
  return new Promise((resolve, reject) => {
    Serie.findByIdAndDelete(id, (error, result) => {
      if (error) {
        reject(error);
      }
      if (!result) {
        reject("No se encontro la serie");
      }
      resolve(result);
    });
  });
};

const createSerie = async (title, description, url, category, userOwner) => {
  let result;
  try {
    const userFound = await User.findById(userOwner);
    if (!userFound) {
      return;
    }
    const newSerie = new Serie({
      title,
      description,
      url,
      category,
      userOwner,
    });
    await newSerie.save();
    userFound.favorites.push(newSerie._id);
    await userFound.save();
  } catch (error) {
    throw error;
  }

  return result;
};

module.exports = {
  getSeries,
  getOneSerie,
  updateSerie,
  deleteSerie,
  createSerie,
};
