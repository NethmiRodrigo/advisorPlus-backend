const auth = require("../middleware/auth");

module.exports = (app) => {
  const comment = require("../controllers/comment.controller.js");

  app.post("/comment", auth("advisor"), comment.create);

  app.get("/comment/:commentId", auth(), comment.findById);

  app.put("/comment/:commentId", auth("advisor"), comment.update);

  //get all commments for a post
  app.get("/comment/:postId", auth(), comment.findAllByPost);

  //get all comments of a user
  app.get("/comment/:userId", auth(), comment.findAllByUser);

  app.delete("/comment/:commentId", auth("advisor"), comment.delete);
};
