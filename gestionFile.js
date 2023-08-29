
const express = require('express');
const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('static'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/static/index.html');
});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
