import { Configuration, OpenAIApi } from "openai";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = 3001;
dotenv.config();

const configuration = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${req.body.message}`,
    temperature: 0,
    max_tokens: 1500,
  });
  res.json({ message: response?.data?.choices[0]?.text });
});

app.listen(port, () => {
  console.log(`app listening.. port:${port}`);
});
