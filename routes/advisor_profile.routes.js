module.exports = (app) => {
  const advisor = require("../controllers/advisor_profile.controller");

  app.post("/advisor_profile", advisor.create);

  app.get("/advisor_profile/:advisorId", advisor.findById);

  app.put("/advisor_profile/:advisorId", advisor.update);

  app.delete("/advisor_profile/:advisorId", advisor.delete);
};
