const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./app/config/config.js");
const app = express();

app.use(cors({
    origin: "http://localhost:8080"
}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync().then(() => {
    initial(); // Just use it in development, at the first time execution!. Delete it in production
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hi there, welcome to this tutorial." });
});

// api routes
require("./app/routes/book.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/post.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/media.routes")(app);
require("./app/routes/tag.routes")(app);
require("./app/routes/validate.routes")(app);

// load modules
require("./app/modules/lpkstore")(app, {

});

// set port, listen for requests
const PORT = config.PORT;
app.listen(PORT, () => {
    console.table(config);
    console.log(`Server is running on port ${PORT}`);
});

// Just use it in development, at the first time execution!. Delete it in production
function initial() {
  // Role.create({
  //   id: 1,
  //   name: "user"
  // });

  // Role.create({
  //   id: 2,
  //   name: "moderator"
  // });

  // Role.create({
  //   id: 3,
  //   name: "admin"
  // });
}
