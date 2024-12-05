import express from "express";
import cors from "cors";

const Vigenere = require("caesar-salad").Vigenere;

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post("/encode", (req, res) => {
  try {
    const { password, message } = req.body;
    const encodedMessage = Vigenere.Cipher(password).crypt(message);
    res.send({ encoded: encodedMessage });
  } catch (err) {
    console.error();
  }
});

app.post("/decode", (req, res) => {
  try {
    const { password, message } = req.body;
    const decodedMessage = Vigenere.Decipher(password).crypt(message);
    res.send({ decoded: decodedMessage });
  } catch (err) {
    console.error();
  }
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
