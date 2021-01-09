module.exports = (app) => {
  const qualification = require("../controllers/qualification.controller.js");

  app.post("/qualification", qualification.create);

  app.get("/qualification/:qualificationId", qualification.findById);

  app.put("/qualification/:qualificationId", qualification.update);

  app.delete("/qualification/:qualificationId", qualification.delete);
};
