const express = require('express');
const app = express();
// Set up our port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;
const winesRouter = express.Router();

const data = require('./wines.json');

winesRouter.get('/wines', function(req, res) {
  res.send(data);
});

app.use('/api/v1', winesRouter);

app.listen(PORT, function() {
  console.log('App listening on port 3000');
});
