module.exports = (app) => {
  const userController = require("../controllers/user.controller");

  app.post("/signup", userController.signup);
  app.post("/login", userController.login);
};
