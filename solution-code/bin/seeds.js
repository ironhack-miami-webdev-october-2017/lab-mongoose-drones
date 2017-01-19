const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/drones-dev');

const Drone = require('../models/drone');

const droneData = [
  { droneName: 'Creeper XL 500', propellers: 3, maxSpeed: 12 },
  { droneName: 'Racer 57', propellers: 4, maxSpeed: 20 },
  { droneName: 'Courier 3000i', propellers: 6, maxSpeed: 18 }
];

Drone.create(droneData, (err, droneDocs) => {
  if (err) { throw err; }

  droneDocs.forEach((drone) => {
    console.log(`${drone.droneName} ${drone._id}`);
  });

  mongoose.disconnect();
});
