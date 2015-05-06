var path = require('path');
var _ = require('lodash');
var express = require('express');

process.env.NODE_PATH = path.join(__dirname, '..');
require('module').Module._initPaths();

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(require('serve-favicon')(path.join(__dirname, 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/resume', function(req, res) {
  res.sendFile(path.join(__dirname, 'resume.pdf'));
});

app.listen(app.get('port'), function() {
  console.log('Listening on port', app.get('port'));
});

exports = module.exports = app;
