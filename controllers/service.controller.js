const { Service } = require("../models");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  const service = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
  };

  Service.create(service)
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
  const id = req.params.serviceId;
  Service.findByPk(id)
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
  const id = req.params.serviceId;
  Service.update(req.body, {
    where: { id: id },
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
  const id = req.params.serviceId;

  Service.destroy({
    where: { id: id },
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
