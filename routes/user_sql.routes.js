const auth = require("../middleware/auth");

module.exports = (app) => {
  const users = require("../controllers/user_sql.controller.js");

  app.post("/user_sql", auth(), users.create);

  app.get("/user_sql/:userId", auth(), users.findById);

  app.put("/user_sql", auth("user"), users.update); //dont ask for params userID here user req.user.uid in controller.

  app.delete("/user_sql/:userId", auth("user"), users.delete); //dont ask for params userID here use req.user.uid in controller.

  app.post("/user-image", auth("user"), users.uploadProfileImage);
};
