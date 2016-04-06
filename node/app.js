/**
 * Created by 111 on 16/4/1.
 */
var express = require('express'),
  cors = require('cors'),
  domain = require('domain'),
  path = require('path'),
  ejs = require('ejs'),
  app = express(),
  data = require('./data.js'),
  db = require('./db.js');

//app.set('views', __dirname + '../views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(cors());
//app.use(express.static(path.join(__dirname, '../views')));

app.listen(2223, function () {
  console.log('Listen:http://localhost:2223');
});
app.get('/submit', function (req, res) {
  var d = domain.create();

  d.on('err', function (err) {
    if (err) throw err;
  });

  d.run(function () {
    db.connect(function () {
      var order = req.query;
      db.addOrder(order, function () {
        db.disconnection();
        res.send({orderStatus: 'success'});
      });
    });
  });
});

app.get('/loginSubmit', function (req, res) {
  res.send({department: req.query.department, user: req.query.user});
});
