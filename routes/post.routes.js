module.exports = (app) => {
  const post = require("../controllers/post.controller.js");

  app.post("/post", post.create);

  app.get("/post/:postId", post.findById);

  app.put("/post/:postId", post.update);

  //get all  posts of a user
  app.get("/post", post.findAllByUser);

  app.delete("/post/:postId", post.delete);
};
