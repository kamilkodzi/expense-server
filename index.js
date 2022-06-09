const express = require("express");
const app = express();
const routes = require("./routes/routes.js");
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello Gaming-server!");
});

app.use("/api", routes);

app.listen(3000, () => {
  console.log(`Server starts on port 3000`);
});
