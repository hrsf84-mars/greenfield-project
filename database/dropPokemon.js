const db = require('./db.js');

db.Pokemon.drop().then(console.log);