exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          name: 'Taylor', 
          password: 'password', 
          email: 'tman2272@aol.com',
        })
      ]);
    });
};
