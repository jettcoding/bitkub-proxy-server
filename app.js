const express = require("express");
const app = express();
const axios = require("axios");
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const bodyParser = require("body-parser");

// Configure CORS
const corsOptions = {
  origin: '*', // You can specify allowed origins here, e.g., 'http://example.com'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-BTK-APIKEY', 'X-BTK-TIMESTAMP', 'X-BTK-SIGN'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/sendApi", (req, res) => {
  const { method, url, headers, data } = req.body;
  if (!method || !url) {
    console.log("Method and URL are required");
    return res.status(400).json({ message: "Method and URL are required" });
  }
  console.log("Received API request:", { method, url, headers, data });
  console.log("Sending API request...");
  axios({
    method,
    url,
    headers,
    data,
  })
    .then((response) => {
      console.log("API request successful");
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      console.log("API request failed", error.response.status, error.response.data);
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});