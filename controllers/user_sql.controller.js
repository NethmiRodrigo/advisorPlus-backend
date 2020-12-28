const User = require("../model/user_sql.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  const user = new User({
    UID: req.body.UID,
    name: req.body.name,
    username: req.body.username,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth,
    age: 12,
    date_of_registration: req.body.date_of_registration,
    status_id: req.body.status_id,
    image: req.body.image,
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    else res.send(data);
  });
};

exports.findById = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found with id ${req.params.userId}`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving User with id  ${req.params.customerId}.`,
        });
      }
    } else res.send(data);
  });
};

exports.updateById = (req, res) => {
  if (!res.body) {
    res.status(400).send({
      message: "Update data cannot be NULL!",
    });
  }

  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found with id ${req.params.userId}`,
        });
      } else {
        res.status(500).send({
          message: `Error updating User with id  ${req.params.userId}.`,
        });
      }
    } else res.send(data);
  });
};

exports.deleteById = (req, res) => {
  User.deleteById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete user with id " + req.params.userId,
        });
      }
    } else res.send({ message: `user was deleted successfully!` });
  });
};
