const auth = require("../middleware/auth");

module.exports = (app) => {
  const advisor = require("../controllers/advisor_profile.controller");

  app.post("/advisor_profile", auth(), advisor.create);

  app.get("/advisor_profile/:advisorId", auth(), advisor.findById);

  app.put("/advisor_profile/:advisorId", auth("advisor"), advisor.update);

  app.delete("/advisor_profile/:advisorId", auth("advisor"), advisor.delete);

  app.post("/advisor-image", auth("advisor"), advisor.uploadProfileImage);
};
