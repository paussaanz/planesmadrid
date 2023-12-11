const mongoose = require('mongoose');
const Actividad = require('../models/Actividades.model');
const { actividades } = require('../public/js/actividades.json');
require('../config/db.config');

mongoose.connection.once('open', () => {
  mongoose.connection.dropCollection('actividades')
    .then(() => {
      console.log('DB cleared');
    })
    .then(() => {
      return Actividad.create(actividades);
    })
    .then((actividadesDB) => {
      actividadesDB.forEach(actividad => console.log(`${actividad.title} has been created`));
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