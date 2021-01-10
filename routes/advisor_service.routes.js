const auth = require("../middleware/auth");

module.exports = (app) => {
  const advisor_service = require("../controllers/advisor_service.controller");

  app.get("/services/:advisor_id", auth(), advisor_service.getAllServices);

  app.get("/advisors/:service_id", auth(), advisor_service.getAllAdvisors);

  app.post("/add-services", auth("advisor"), advisor_service.addServices);
};
