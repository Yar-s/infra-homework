const express = require('express');

const app = express();

const {USERNAME} = process.env;

const {API_KEY} = require('/var/static/secrets');

const fetchOpts = {
  headers: {
      'PRIVATE-TOKEN': API_KEY
  }
};

app.get('/', async (req, res) => {
  const userResponse = await fetch(`https://course.gitlab.yandexcloud.net/api/v4/users?search=${USERNAME}`, fetchOpts);
  const user = await userResponse.json();

  res.type('json');
  res.send(user);
});

app.listen(8080, () => {
  console.log('Server listen on port 8080');
});

// Обратите внимание что по умолчанию node.js не завершается по SIGINT (ctrl + c)
process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
})
