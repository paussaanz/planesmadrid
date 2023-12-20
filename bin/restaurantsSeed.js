const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurants.model');
const { restaurants } = require('../public/js/restaurants.json');
require('../config/db.config');

mongoose.connection.once('open', () => {
  mongoose.connection.dropCollection('restaurants')
    .then(() => {
      console.log('DB cleared');
    })
    .then(() => {
      return Restaurant.create(restaurants);
    })
    .then((restaurantsCB) => {
      console.log(restaurantsCB)
        restaurantsCB.forEach(restaurant => console.log(`${restaurant.name} has been created`));
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

