var express = require('express');
var app = express();

app.use(express.static('public'));
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res) => {
  const validDate = new Date(req.params.date);
  const currentDate = new Date();
  const msRegex = /^\d*$/;
  if(!req.params.date) {
    res.json({"unix": currentDate.getTime(), "utc": currentDate.toUTCString()});
  } else if(msRegex.test(req.params.date)) {
    const newDate = new Date();
    newDate.setTime(req.params.date);
    res.json({"unix": Number(req.params.date), "utc": newDate.toUTCString()});
  } else if(validDate=="Invalid Date") {
    res.json({"error": "Invalid Date"});
  } else {
    res.json({"unix": validDate.getTime(), "utc": validDate.toUTCString()});
  };
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
