const chapter = require("../models/chapter");
const { chapterService } = require("../services");
const getChapters = async (req, res) => {
  try {
    const result = await chapterService.getChapters();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createChapter = (req, res) => {};
const updateChapter = (req, res) => {};
const deleteChapter = (req, res) => {};

module.exports = {
  getChapters,
  createChapter,
  updateChapter,
  deleteChapter,
};
