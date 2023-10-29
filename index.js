// index.js
const express = require('express')
const path = require('path');

const app = express()
const PORT = 4000
app.use(express.static(__dirname + '/public'));
app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });
  
  
app.get('/about', (req, res) => {
  res.send('This is my about route..... ')
})

// Export the Express API
module.exports = app
