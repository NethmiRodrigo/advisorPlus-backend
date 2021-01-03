module.exports = (app) => {
  const comment = require("../controllers/comment.controller.js");

  app.post("/comment", comment.create);

  app.get("/comment/:commentId", comment.findById);

  app.put("/comment/:commentId", comment.update);

  //get all commments for a post
  app.get("/comment/:postId", comment.findAllByPost);

  //get all comments of a user
  app.get("/comment/:userId", comment.findAllByUser);

  app.delete("/comment/:commentId", comment.delete);
};
