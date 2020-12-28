module.exports = (app) => {
  const users = require("../controllers/user_sql.controller.js");

  app.post("/user_sql", users.create);

  app.get("/user_sql/:userId", users.findById);

  app.put("/user_sql/:userId", users.updateById);

  app.delete("/user_sql/:userId", users.deleteById);
};
