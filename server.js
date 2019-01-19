const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const cors = require('cors');
const path = require('path')

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'coencollection';

app.get('/api/users', (request, response) => {
  database('users').select()
    .then((users) => {
      response.status(200).json(users);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/users/new', (request, response) => {
  const user = request.body

  for (let requiredParameter of ['name', 'email', 'password']){
    if(!user[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, email: <String>, password: <String>, }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('users').insert(user, 'id')
    .then(user => {
      response.status(201).json({ id: user[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    });
});

app.post('/api/users', (request, response) => {
  const user = request.body

  for(let requiredParam of ['email', 'password']) {
      if(!user[requiredParam]) {
          response.status(422).json({error: error.message})
      }
  }

  database('users').where('email', user.email)
      .select()
      .then(userIds => {
          response.status(201).json(userIds[0])
      })
      .catch(error => {
          response.status(500).json({error: error.message})
      })
})

app.post('/api/users/favorites/new', (request, response) => {
  const favorite = request.body;

  for (let requiredParameter of ['movie_id', 'user_id', 'title', 'poster_path', 'release_date', 'vote_average', 'overview']){
    if (!favorite[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` });
    }
  }

  database('favorites').insert(favorite, 'id')
    .then(favorite => {
      response.status(201).json({ id: favorite[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/users/:id/favorites', (request, response) => {
  database('favorites')
    .where('id', request.params.id).select()
    .then(favorite => {
      if(favorite.length) {
        response.status(200).json(favorite)
      } else {
        response.status(404).json({
          error: `Could not find paper with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/users/:id/favorites/:movie_id', (request,response) => {
  const { id, movie_id } = request.params

  databse('favorites')
    .where('movie_id', movie_id)
    .del()
    .then(favorite => {
      response.status(201).json(id)
    })
    .catch( error => {
      response.status(500).json({error: error.message})
    })
})

app.use(express.static(path.join(__dirname, 'build')));


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;