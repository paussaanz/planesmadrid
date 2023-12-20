const mongoose = require('mongoose');
const Activity = require('../models/Activities.model');
const { activities } = require('../public/js/activities.json');
require('../config/db.config');

mongoose.connection.once('open', () => {
  mongoose.connection.dropCollection('activities')
    .then(() => {
      console.log('DB cleared');
    })
    .then(() => {
      return Activity.create(activities);
    })
    .then((activitiesDB) => {
      activitiesDB.forEach(activity => console.log(`${activity.title} has been created`));
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