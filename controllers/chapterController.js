const { chapterService } = require("../services");
const { validationResult } = require("express-validator");

const getChapters = async (req, res) => {
  try {
    const { title } = req.params;
    const result = await chapterService.getChapters(title);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createChapter = async (req, res) => {
  try {
    const resultValidationReq = validationResult(req);
    const hasError = !resultValidationReq.isEmpty();

    if (hasError) {
      console.log("hay un error");
      return res.status(400).send(resultValidationReq);
    }
    const { title, description, video, serieOwner } = req.body;
    const result = await chapterService.createChapter(
      title,
      description,
      video,
      serieOwner
    );
    res.status(201).send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: "se produjo un error al crear el capitulo", error });
  }
};

const updateChapter = async (req, res) => {
  try {
    const resultValidationReq = validationResult(req);
    const hasError = !resultValidationReq.isEmpty();

    if (hasError) {
      console.log("hay un error");
      return res.status(400).send(resultValidationReq);
    }
    const { id } = req.params;
    const { title, description, video } = req.body;
    const result = chapterService.updateChapter(id, title, description, video);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: "Se produjo un error al actualizar el capitulo" + error,
    });
  }
};

const deleteChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await chapterService.deleteChapter(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: "Se produjo un error al borrar el capitulo" + error,
    });
  }
};

module.exports = {
  getChapters,
  createChapter,
  updateChapter,
  deleteChapter,
};
