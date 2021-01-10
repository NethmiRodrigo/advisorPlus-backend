const auth = require("../middleware/auth");

module.exports = (app) => {
  const qualification = require("../controllers/qualification.controller.js");

  app.post("/qualification", auth("advisor"), qualification.create);

  app.get("/qualification/:qualificationId", auth(), qualification.findById);

  app.put("/qualification/:qualificationId", auth(), qualification.update);

  app.delete("/qualification/:qualificationId", auth(), qualification.delete);
};
