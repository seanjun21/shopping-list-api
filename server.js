var express = require('express');
var bodyParser = require('body-parser');
// CONSTRUCTOR
var Storage = function () {
  this.items = [];
  this.id = 0;
};

// ADD METHOD for CONSTRUCTOR
Storage.prototype.add = function (name) {
  var item = {
    name: name,
    id: this.id
  };
  this.items.push(item);
  this.id += 1;
  return item;
};

// ADDING items to list
var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

// USE CONSTRUCTORS to create OBJECTS
var app = express();
var jsonParser = bodyParser.json();

// serves static files in public folder
app.use(express.static('public'));

// localhost:8080/items
app.get('/items', function (req, res) {
  res.json(storage.items);
});

// Data is formatted and parsed through body-parser (JSON format)
app.post('/items', jsonParser, function (req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }

  var item = storage.add(req.body.name);
  res.status(201).json(item);
});

app.delete('/items/:id', function (req, res) {
  var id = parseInt(req.params.id);
  for (var i = 0; i < storage.items.length; i++) {
    if (storage.items[i].id === id) {
      console.log('delete');
      return;
    }
  }
  console.log('nothing');
});

app.listen(process.env.PORT || 8080);
