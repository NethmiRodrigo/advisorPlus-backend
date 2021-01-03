const { Advisor_Profile } = require("../models");

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
    status: req.body.status,
    rating: req.body.rating,
    imageURL: req.body.imageURL,
  };

  //save user in the database

  Advisor_Profile.create(advisor)
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
  const id = req.params.advisorId;
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
