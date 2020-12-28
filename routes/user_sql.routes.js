module.exports = (app) => {
  const users = require("../controllers/user_sql.controller.js");

  app.post("/user_sql", users.createUser);

  app.get("/user_sql/:userId", users.getUser);

  app.put("/user_sql/:userId", users.updateUser);

  app.delete("/user_sql/:userId", user.deleteUser);
};
