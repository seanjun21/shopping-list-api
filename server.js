var express = require( 'express' );
var bodyParser = require( 'body-parser' );
// CONSTRUCTOR
var Storage = function() {
  this.items = [];
  this.id = 0;
};

// ADD METHOD for CONSTRUCTOR
Storage.prototype.add = function( name ) {
  var item = {
    name: name,
    id: this.id
  };
  this.items.push( item );
  this.id += 1;
  return item;
};

Storage.prototype.delete = function( index ) {
  var deleted = this.items.splice( index, 1 );
  return deleted;
};

Storage.prototype.put = function( index, reqName ) {
  this.items[ index ].name = reqName;
  return this.items[ index ].name;
};

// ADDING items to list
var storage = new Storage();
storage.add( 'Broad beans' );
storage.add( 'Tomatoes' );
storage.add( 'Peppers' );

// USE CONSTRUCTORS to create OBJECTS
var app = express();
var jsonParser = bodyParser.json();

// serves static files in public folder
app.use( express.static( 'public' ) );

// localhost:8080/items
app.get( '/items', function( req, res ) {
  res.json( storage.items );
} );

// Data is formatted and parsed through body-parser (JSON format)
app.post( '/items', jsonParser, function( req, res ) {
  if ( !req.body ) {
    return res.sendStatus( 400 );
  }

  var item = storage.add( req.body.name );
  res.status( 201 ).json( item );
} );

app.delete( '/items/:id', function( req, res ) {
  var id = parseInt( req.params.id );
  for ( var i = 0; i < storage.items.length; i++ ) {
    if ( storage.items[ i ].id === id ) {
      var deleted = storage.delete( i );
      return res.status( 200 ).json( deleted );
    }
  }
  return res.sendStatus( 400 );
} );

app.put( '/items/:id', jsonParser, function( req, res ) {
  var id = parseInt( req.params.id );
  if ( !req.body ) {
    return res.sendStatus( 400 );
  }
  for ( var i = 0; i < storage.items.length; i++ ) {
    if ( storage.items[ i ].id === id ) {
      var edited = storage.put( i, req.body.name );
      return res.status( 200 ).json( edited );
    }
  }
  return res.sendStatus( 400 );
} );

app.listen( process.env.PORT || 8080 );

exports.app = app;
exports.storage = storage;
