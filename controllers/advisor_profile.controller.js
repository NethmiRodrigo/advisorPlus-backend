const { Advisor_Profile, User_Role } = require("../models");
const firebaseConfig = require("../config/fb_config");
const { multerUpload } = require("../middleware/multer");
const fs = require("fs");
const { admin } = require("../util/admin");
const { response } = require("express");

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }
  // create new user
  const advisor = {
    user_id: req.user.uid,
    full_name: req.body.name,
  };

  if (!advisor.full_name)
    return res.status(400).json({ message: "Invalid input" });

  //save user in the database
  User_Role.create({ user_id: advisor.user_id, role: "advisor" })
    .then(() => {
      return Advisor_Profile.create(advisor);
    })
    .then((data) => {
      return res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};
exports.findAll = (req, res) => {
  Advisor_Profile.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "ERROR",
      });
    });
};
exports.findById = (req, res) => {
  const id = req.params.advisorId;
  Advisor_Profile.findByPk(id)
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
  const id = req.user.uid;
  Advisor_Profile.update(req.body, {
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
  const id = req.params.advisorId;

  //TODO : DELETE respective row from user_role table

  Advisor_Profile.destroy({
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
        let user = await Advisor_Profile.findByPk(request.user.uid);
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
