const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Minimal server works!');
});

app.listen(4001, () => {
  console.log('Test server on http://localhost:4001');
});