const { Comment } = require("../models");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }
  // create new post
  const comment = {
    post_id: req.body.post_id,
    user_id: req.user.uid,
    body: req.body.body,
    rating: req.body.status,
  };

  //save post in the database

  Comment.create(comment)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findById = (req, res) => {
  const id = req.params.commentId;
  Post.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
exports.findAllByUser = (req, res) => {
  const user_id = req.query.user_id;
  var condition = user_id ? { user_id: user_id } : null;
  Post.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occurred while retrieving Posts.",
      });
    });
};
exports.findAllByPost = (req, res) => {
  const post_id = req.params.post_id;
  var condition = post_id ? { post_id: post_id } : null;
  Post.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occurred while retrieving Posts.",
      });
    });
};
exports.update = (req, res) => {
  const id = req.params.postId;
  Post.update(req.body, {
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
  const id = req.params.postId;

  Post.destroy({
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
