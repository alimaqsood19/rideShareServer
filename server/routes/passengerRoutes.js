const express = require('express');
const router = express.Router();
const Passenger = require('../db/collections/passenger');
const Driver = require('../db/collections/driver');
const User = require('../db/collections/user');



router.get('/', (req, res) => {
  Passenger.find({})
    .then(passenger => {
      if (!passenger) {
        return;
      }
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  User.find({ _id: id })
    // .populate('driver')
    // .populate('passenger')
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post('/', (req, res) => {
  let passenger = new Passenger(req.body);

  passenger
    .save()
    .then(user => {
      res.status(200).send(passenger);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});
router.post('/filter', (req, res) => {
  let user = User.find({_id: req.body.id});
  let location = [user.userAddress.lng, user.userAddress.lat]
  
  let destination = [req.body.userAddress.lng, req.body.userAddress.lat];

  let userLocation = Driver.find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: location },
        $minDistance: 1000,
        $maxDistance: 1000
      }
    }
  })


  let destLocation = Driver.find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: `${destination[0]},${destination[1]}`  },
        $minDistance: 1000,
        $maxDistance: 5000
      }
    }
  })

});

router.patch('/:id', (req, res) => {
  let id = req.params.id;

  Passenger.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true })
    .then(passenger => {
      if (!passenger) {
        return res.status(400).send('No passenger with that ID found');
      }
      res.status(200).send('Updated passenger: ', passenger);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;

  Passenger.findByIdAndRemove({ _id: id }, (req, res) => {
    res.status(200).send(`Successfully deleted ${id}`);
  }).catch(err => {
    res.status(400).send(err);
  });
});

module.exports = router;
