const express = require("express");

const fs = require("fs").promises;

const path = require("path");

const app = express();
app.use(express.json());

const informationPath = path.resolve(__dirname, "./information.json");

const readFile = async () => {
  try {
    const data = await fs.readFile(informationPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(`File cannot be read: ${error}`);
  }
};

app.get("/homework/:id", async (req, res) => {
  try {
    const allInformation = await readFile();
    const info = allInformation.find(({ id }) => id === Number(req.params.id));
    res.status(200).json(info);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = app;
