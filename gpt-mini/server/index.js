const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// Allow Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(bodyParser.json());

// OpenAI Configuration
const configuration = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Define your routes
app.post("/hello", (req, res) => {
  res.status(200).send(req.body);
});

app.post("/test", async (req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${req.body.message}`,
    temperature: 0,
    max_tokens: 1400,
  });

  const responseData = response.data.choices[0].text;
  res.status(200).send(responseData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
