const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'coencollection';




app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;