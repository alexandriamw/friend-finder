// Dependencies
const express = require("express");

// Sets up the Express App
const app = express();
const PORT = process.env.port || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });