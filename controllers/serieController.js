const { serieService } = require("../services");
const { validationResult } = require("express-validator");

const getSeries = async (req, res) => {
  try {
    const result = await serieService.getSeries();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOneSerie = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await serieService.getOneSerie(id);
    const { _id, title, description, url, chapters } = result;
    res.status(200).send({
      id: _id,
      title,
      description,
      url,
      chapters,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateSerie = async (req, res) => {
  try {
    const resultValidationReq = validationResult(req);
    const hasError = !resultValidationReq.isEmpty();

    if (hasError) {
      console.log("hay un error");
      return res.status(400).send(resultValidationReq);
    }
    const { id } = req.params;
    const { title, description, url, category } = req.body;
    const result = await serieService.updateSerie(
      id,
      title,
      description,
      url,
      category
    );
    res
      .status(200)
      .send({ message: "La serie ha sido actualizada correctamente", result });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteSerie = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await serieService.deleteSerie(id);
    res
      .status(204)
      .send({ message: "La serie ha sido eliminado correctamente", result });
  } catch (error) {
    res.status(500).send(error);
  }
};

const createSerie = async (req, res) => {
  try {
    const resultValidationReq = validationResult(req);
    const hasError = !resultValidationReq.isEmpty();

    if (hasError) {
      console.log("hay un error");
      return res.status(400).send(resultValidationReq);
    }
    const { title, description, url, category, userOwner } = req.body;
    const result = await serieService.createSerie(
      title,
      description,
      url,
      category,
      userOwner
    );
    res.status(201).send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: "se produjo un error al crear la serie", error });
  }
};

module.exports = {
  getSeries,
  getOneSerie,
  createSerie,
  updateSerie,
  deleteSerie,
};
