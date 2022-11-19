const Serie = require("../models/serie");
const Chapter = require("../models/chapter");

const getChapters = () => {
  return new Promise((resolve, reject) => {
    Chapter.find({}, (error, result) => {
      if (error) {
        reject(error);
      }
      if (!result) {
        reject({
          status: 500,
          message: "No se encontro el capitulo",
        });
      }
      resolve(result);
    });
  });
};

const getChapterSerie = (serieOwner) => {
  return new Promise((resolve, reject) => {
    Chapter.find({ serieOwner }, (error, result) => {
      if (error) {
        reject(error);
      }
      if (!result) {
        reject({
          status: 500,
          message: "No se encontro los capitulos de la serie",
        });
      }
      resolve(result);
    });
  });
};

const createChapter = () => {};

const updateChapter = () => {};

const deleteChapter = () => {};
module.exports = {
  getChapters,
  getChapterSerie,
  createChapter,
  updateChapter,
  deleteChapter,
};
