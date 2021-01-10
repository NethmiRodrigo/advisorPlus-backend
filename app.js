const express = require("express");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerDocument = require("./swagger.json");
const { sequelize } = require("./models");

const app = express();

const port = "5000" || process.env.PORT;

app.use(cors());
app.use(express.json());

/* Log HTTP requests */
app.use(morgan("dev"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.status(200).send(`Server is running at port ${port}`);
});

//User routes
const userRoutes = require("./routes/user.routes");
userRoutes(app);

const user_sqlRoutes = require("./routes/user_sql.routes");
user_sqlRoutes(app);

const postRoutes = require("./routes/post.routes");
postRoutes(app);

const advisorRoutes = require("./routes/advisor_profile.routes");
advisorRoutes(app);

const serviceRoutes = require("./routes/service.routes");
serviceRoutes(app);

const advisor_serviceRoutes = require("./routes/advisor_service.routes");
advisor_serviceRoutes(app);

app.listen(port, async () => {
  console.log(`Praise the lord! It's running on http://localhost:${port}`);
  await sequelize.authenticate();
  console.log("Oh mighty database. Give us thy bread!");
});
