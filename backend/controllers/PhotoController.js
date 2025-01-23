const Photo = require("../models/Photo");

const mongoose = require("mongoose");
const User = require("../models/User");

// Insert a photo, with an user related to it

const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const { image } = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  if (!newPhoto) {
    res.status(400).json({ errors: ["Erro ao inserir foto"] });
    return;
  }

  res.status(201).json(newPhoto);
};

// Remove photo from DB

const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

    // check if photo belongs to user

    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro tente novamente mais tarde."] });
      return;
    }

    await Photo.findByIdAndDelete(new mongoose.Types.ObjectId(id));
    res
      .status(200)
      .json({ id: photo._id, message: "Foto deletada com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ errors: ["Foto não encontrada"] });
  }
};

const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

const getAllPhotosByUser = async (req, res) => {
  const { id } = req.params;

  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

const getPhotoById = async (req, res) => {
  const { id } = req.params;
  const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

  if (!photo) {
    return res.status(404).json({ errors: ["Foto não encontrada"] });
  }

  res.status(200).json(photo);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getAllPhotosByUser,
  getPhotoById,
};
