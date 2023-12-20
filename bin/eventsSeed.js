const mongoose = require('mongoose');
const Event = require('../models/Events.model');
const { events } = require('../public/js/events.json');
require('../config/db.config');

mongoose.connection.once('open', () => {
  mongoose.connection.dropCollection('events')
    .then(() => {
      console.log('DB cleared');
    })
    .then(() => {
      return Event.create(events);
    })
    .then((eventsCB) => {
      eventsCB.forEach(event => console.log(`${event.title} has been created`));
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

