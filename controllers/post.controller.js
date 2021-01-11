const { response } = require("express");
const { Post, User_Profile } = require("../models");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }
  // create new post
  const post = {
    user_id: req.user.uid,
    body: req.body.body,
    content: req.body.content,
    audience: req.body.audience,
    service: req.body.service,
  };

  //save post in the database

  Post.create(post)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.findAll = async (req, res) => {

  try{
    let posts = await Post.findAll();
    posts.forEach((item)=>{
      item.full_name = User_Profile.findByPk(item.user_id).full_name
    })
    return res.status(200).json({posts});
  }

  catch(error){
    res.status(500).json({error});
  }
};
exports.findById = async (req, res) => {
  const id = req.params.postId;
  try{
  let PostbyID = Post.findByPk(id)
    PostbyID.full_name = await User_Profile.findByPk(PostbyID.user_id);
    return res.status(200).json({PostbyID});
  }
  catch(error){
    res.status(500).json({error})
  }
  
};
exports.findAllByUser = async (req, res) => {
  const user_id = req.params.userId;
  var condition = user_id ? { user_id: user_id } : null;
  let user =  await User_Profile.findByPk(user_id)

  try{
    let listPosts = Post.findAll({ where: condition })
    listPosts.forEach((item) => {
      item.full_name = user.full_name;
    })
    return res.status(200).json({listPosts});
  }
  catch(error){
    res.status(500).json({error})
  }
};

exports.findAllByPost = async (req, res) => {
  const post_id = req.params.post_id;
  var condition = post_id ? { post_id: post_id } : null;
  try{
    let listPosts = Post.findAll({ where: condition })
    listPosts.forEach((item)=>{
      let user = await User_Profile.findByPk(item.user_id);
      item.full_name = user.full_name;
    })
    return res.status(200).json({listPosts});
}
  catch(error){
    res.status(500).json({error})
  }
};

exports.update = async (req, res) => {
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

exports.delete = async (req, res) => {
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
