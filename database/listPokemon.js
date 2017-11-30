const db = require('./db.js');

db.Pokemon.findAll({})
.then( data => {
  console.log(data.length);
});