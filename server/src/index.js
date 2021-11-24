const path = require('path');
const express = require('express');
const Controller = require('./controller');

const app = express()
const port = 3000

// Miners manager
const controller = new Controller();

// Loading specific miners
controller.loadMiner('stratum');
controller.loadMiner('coinhive');

// Public API (status, settings etc)
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client/src/html/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})