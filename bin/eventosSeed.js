const mongoose = require('mongoose');
const Evento = require('../models/Eventos.model');
const { eventos } = require('../public/js/eventos.json');
require('../config/db.config');

mongoose.connection.once('open', () => {
  mongoose.connection.dropCollection('eventos')
    .then(() => {
      console.log('DB cleared');
    })
    .then(() => {
      return Evento.create(eventos);
    })
    .then((eventosCB) => {
      eventosCB.forEach(evento => console.log(`${evento.title} has been created`));
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

