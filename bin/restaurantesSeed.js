const mongoose = require('mongoose');
const Restaurante = require('../models/Restaurantes.model');
const { restaurantes } = require('../public/js/restaurantes.json');
require('../config/db.config');

mongoose.connection.once('open', () => {
  mongoose.connection.dropCollection('restaurantes')
    .then(() => {
      console.log('DB cleared');
    })
    .then(() => {
      return Restaurante.create(restaurantes);
    })
    .then((restaurantesCB) => {
      console.log(restaurantesCB)
        restaurantesCB.forEach(restaurante => console.log(`${restaurante.name} has been created`));
    })
    .catch(err => console.error(err))
    .finally(() => {
      mongoose.connection.close()
      .then(() => {
        console.log('End of seeds');
      })
      .catch((err) => console.error('Error while disconnecting', err))
      .finally(() => process.exit(0))
    })
})

