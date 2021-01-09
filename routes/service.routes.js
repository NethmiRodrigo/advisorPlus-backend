module.exports = (app) => {
  const service = require("../controllers/service.controller.js");

  app.post("/service", service.create);

  app.get("/service/:serviceId", service.findById);

  app.put("/service/:serviceId", service.update);

  app.delete("/service/:serviceId", service.delete);
};
