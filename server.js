var express = require('express');

// CONSTRUCTOR
var Storage = function () {
  this.items = [];
  this.id = 0;
}

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

var app = express();
// serves static files in public folder
app.use(express.static('public'));

// localhost:8080/items
app.get('/items', function (req, res) {
  res.json(storage.items);
});

app.listen(process.env.PORT || 8080);
