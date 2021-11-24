
const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controller');

// Miners
const controller = new Controller();
controller.loadMiner('stratum');

// Public API 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})