const auth = require("../middleware/auth");

module.exports = (app) => {
  const service = require("../controllers/service.controller.js");

  app.post("/service", auth("advisor"), service.create);

  app.get("/service/:serviceId", auth(), service.findById);

  app.put("/service/:serviceId", auth("advisor"), service.update);

  app.delete("/service/:serviceId", auth("advisor"), service.delete);
};
