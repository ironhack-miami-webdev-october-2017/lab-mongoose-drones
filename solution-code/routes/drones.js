const express = require('express');

const Drone = require('../models/drone');

const router = express.Router();


router.get('/drones', (req, res, next) => {
  Drone.find({}, (err, droneDocs) => {
    if (err) { return next(err); }

    res.render('drones/index', {
      drones: droneDocs
    });
  });
});


router.get('/drones/new', (req, res, next) => {
  res.render('drones/new');
});

router.post('/drones', (req, res, next) => {
  const droneInfo = {
    droneName: req.body.droneName,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  };

  const theDrone = new Drone(droneInfo);

  theDrone.save((err) => {
    if (err) { return next(err); }

    res.redirect('/drones');
  });
});


router.get('/drones/:id', (req, res, next) => {
  const droneId = req.params.id;

  Drone.findById(droneId, (err, droneDetails) => {
    if (err) { return next(err); }

    res.render('drones/show', {
      drone: droneDetails
    });
  });
});


router.get('/drones/:id/edit', (req, res, next) => {
  const droneId = req.params.id;

  Drone.findById(droneId, (err, droneDetails) => {
    if (err) { return next(err); }

    res.render('drones/edit', {
      drone: droneDetails
    });
  });
});

router.post('/drones/:id', (req, res, next) => {
  const droneId = req.params.id;

  const droneUpdates = {
    droneName: req.body.droneName,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  };

  Drone.findByIdAndUpdate(droneId, droneUpdates, (err, updatedDrone) => {
    if (err) { return next(err); }

    res.redirect('/drones');
  });
});


router.post('/drones/:id/delete', (req, res, next) => {
  const droneId = req.params.id;

  Drone.findByIdAndRemove(droneId, (err, droneDetails) => {
    if (err) { return next(err); }

    res.redirect('/drones');
  });
});


module.exports = router;
