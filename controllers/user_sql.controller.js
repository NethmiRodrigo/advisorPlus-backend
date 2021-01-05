const { response } = require("express");
const { admin } = require("../util/admin");
const { User_Profile } = require("../models");
const firebaseConfig = require("../config/fb_config");
const { multerUpload } = require("../middleware/multer");
const fs = require("fs");

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }
  // create new user
  const user = {
    user_id: req.user.uid,
    full_name: req.body.name,
    content: req.body.content,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    status: req.body.status,
    imageURL: req.body.imageURL,
  };

  //save user in the database

  User_Profile.create(user)
    .then((data) => {
      res.send(data).send({
        message: "SUCCESS",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findById = (req, res) => {
  const uid = req.params.userId;
  User_Profile.findByPk(uid)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.userId;
  User_Profile.update(req.body, {
    where: { user_id: id },
  })
    .then((n) => {
      if (n == 1)
        res.send({
          message: "Updated successfully",
        });
      else {
        res.send({
          message: "Error: Cannot update",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.userId;

  User_Profile.destroy({
    where: { user_id: id },
  })
    .then((n) => {
      if (n == 1)
        res.send({
          message: "Deleted successfully",
        });
      else {
        res.send({
          message: "Error: Cannot delete",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.uploadProfileImage = (request, response) => {
  multerUpload(request, response, async (error) => {
    if (error) {
      //instanceof multer.MulterError

      if (error.code == "LIMIT_FILE_SIZE") {
        error.message = "File Size is too large.";
      }
      return response.status(500).json({ error });
    } else {
      if (!request.file) {
        return response
          .status(500)
          .json({ error: { message: "File not found" } });
      }

      try {
        //Find user from database
        let user = await User_Profile.findByPk(request.user.uid);
        if (!user)
          return response.status(404).json({ error: "User not found" });

        await admin
          .storage()
          .bucket()
          .upload(`public/tmp/${request.file.filename}`, {
            resumable: false,
            metadata: {
              metadata: {
                contentType: request.file.mimetype,
              },
            },
          });

        user.imageURL = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${request.file.filename}?alt=media`;

        user.save();

        //Delete file from temp storage
        fs.unlinkSync(`public/tmp/${request.file.filename}`);

        return response
          .status(200)
          .json({ message: "Image uploaded successfully" });
      } catch (error) {
        return response.status(500).json({ error });
      }
    }
  });
};
