const Serie = require("../models/serie");
const Chapter = require("../models/chapter");

const getChapters = (title) => {
  return new Promise((resolve, reject) => {
    Serie.findOne({ title: title }, (error, result) => {
      if (error) {
        reject(error);
      }
      if (!result) {
        reject({ message: "La serie no se encuentra en la base de datos" });
      } else {
        Chapter.find({ serieOwner: String(result._id) }, (error, result) => {
          if (error) {
            reject({
              message: "Datos no encontrados",
            });
          } else {
            resolve({
              status: 200,
              message: result,
            });
          }
        });
      }
    });
  });
};

const createChapter = async (title, description, video, serieOwner) => {
  let result;
  try {
    const serieFound = await Serie.findById(serieOwner);
    if (!serieFound) {
      return;
    }
    const newChapter = new Chapter({
      title,
      description,
      video,
      serieOwner,
    });
    await newChapter.save();
    serieFound.chapters.push(newChapter._id);
    await serieFound.save();
  } catch (error) {
    throw error;
  }

  return result;
};

const updateChapter = (id, title, description, video) => {
  return new Promise((resolve, reject) => {
    Chapter.findByIdAndUpdate(
      { _id: id },
      { title, description, video },
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve();
      }
    );
  });
};

const deleteChapter = (id) => {
  return new Promise((resolve, reject) => {
    Chapter.findByIdAndDelete(id, (error, result) => {
      if (error) {
        reject(error);
      } else if (!result) {
        reject("El episodio no existe.");
      }
      resolve(result);
    });
  });
};

module.exports = {
  getChapters,
  createChapter,
  updateChapter,
  deleteChapter,
};
