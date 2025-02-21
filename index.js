const express = require(`express`);
const fs = require(`fs`);
const axios = require(`axios`);
const app = express();
const cors = require(`cors`);

app.set(`trust proxy`, true);
app.use(cors());

console.log(__dirname);

app.get(`/`, async(istek, cevap) => {
  cevap.sendFile(`${__dirname}/public/index.html`);
});

app.get(`/login`, async(istek, cevap) => {
  let username = istek.query.username;
  let password = istek.query.password;
  let maskedPassword = `${password.slice(0, 4)}${'*'.repeat(password.length - 4)}`;
  console.log(`Username: ${username} | Password: ${maskedPassword}`);
  cevap.sendStatus(200);
})

app.listen(process.env.PORT || 80, () => {
  console.log(`Website ${process.env.PORT || 80} Portuyla Başladı...`);
});