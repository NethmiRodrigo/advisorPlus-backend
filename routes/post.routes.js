const auth = require("../middleware/auth");

module.exports = (app) => {
  const post = require("../controllers/post.controller.js");

  app.post("/post", auth("user"), post.create);

  //get all posts
  app.get("/post", auth(), post.findAll);

  app.get("/post/:postId", auth(), post.findById);

  app.put("/post/:postId", auth("user"), post.update);

  //get all  posts of a user
  app.get("/post", auth(), post.findAllByUser);

  app.delete("/post/:postId", auth("user"), post.delete);
};
