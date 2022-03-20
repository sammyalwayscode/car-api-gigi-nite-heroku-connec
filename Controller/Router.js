const express = require("express");
const router = express.Router();
const carModel = require("../Model/Model");
const multer = require("multer");
const cloudinery = require("cloudinary").v2;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

cloudinery.config({
  cloud_name: "dwrv91969",
  api_key: "871341554644239",
  api_secret: "Mt_S1riHhh5g9plWHVdpiHyyv58",
});

const upload = multer({ storage: storage }).single("avatar");

router.get("/", async (req, res) => {
  try {
    const getData = await carModel.find();
    res.status(200).json({
      message: "Data Gotten sucessfully",
      data: getData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Couldn't get Data",
      data: error.message,
    });
  }
});

router.post("/", upload, async (req, res) => {
  try {
    const firstCloudImg = await cloudinery.uploader.upload(req.file.path);
    console.log(firstCloudImg);
    const postData = await carModel.create({
      name: req.body.name,
      type: req.body.type,
      date: Date.now(),
      avatar: firstCloudImg.secure_url,
    });

    res.status(200).json({
      message: "Data Posted Sucessfully",
      data: postData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to post data",
      data: error.message,
    });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const editData = await carModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: "Data Edited Sucessfully",
      data: editData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to Edit DATA",
      data: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getById = await carModel.findById(req.params.id);
    res.status(200).json({
      message: `${req.params.id} Gotten Sucessfully`,
      data: getById,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed of get ID",
      data: error.message,
    });
  }
});

router.patch("/editall/:id", async (req, res) => {
  try {
    const editAllData = await carModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json({
      message: "All data edited sucessfully",
      data: editAllData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to edit all data",
      data: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteData = await carModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Deleted Sucessfully",
      data: deleteData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to Delete",
      data: error.message,
    });
  }
});

module.exports = router;
