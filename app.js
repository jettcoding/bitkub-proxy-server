const express = require("express");
const app = express();
const axios = require("axios");
const PORT = process.env.PORT || 80;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/sendApi", (req, res) => {
  const { method, url, headers, data } = req.body;
  if (!method || !url)
    return res.status(400).json({ message: "Method and URL are required" });
  axios({
    method,
    url,
    headers,
    data,
  })
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data);
    });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
