const mongoose = require('mongoose');
const Model = mongoose.model('trips');

//GET: /trips - list all the trips
const tripsList = async (req, res) => {
    Model 
        .find({}) //empty filter for all
        .exec((err, trips) => {
            if(!trips) {
                console.log("Help");
                return res
                    .status(404)
                    .json({"message" : "trips not found"});
            } else if (err) {
                console.log("Help1");
                return res 
                    .status(404)
                    .json(err);
            } else {
                console.log("Help2");
                return res 
                    .status(200)
                    .json(trips);
            }
        });
};

//GET /trips/:tripCode - returns a single trip

const tripsFindByCode = async (req, res) => {
    Model 
        .find({'code' : req.params.tripCode }) //empty filter for all
        .exec((err, trip) => {
            if(!trip) {
                return res
                    .status(404)
                    .json({"message" : "trip not found"});
            } else if (err) {
                return res 
                    .status(404)
                    .json(err);
            } else {
                return res 
                    .status(200)
                    .json(trip);
            }
        });
};

const tripsAddTrip = async (req, res) => {
    console.log(req, body);
    Model
    .create({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image:req.body.image,
        description: req.body.description
    },
    (err, trip) => {
        if (err) {
            return res
                .status(400)
                .json(err);
        } else {
            return res
                .status(201)
                .json(trip);
        }
    });
}

const tripsUpdateTrip = async (req, res) => {
    console.log(req.body); 
    Model

    .findOneAndUpdate({ 'code': req.params.tripCode }, { 
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort, 
        perPerson: req.body.perPerson, 
        image: req.body.image, 
        description: req.body.description
    }, { new: true })
     .then(trip => {
        if (!trip) {
            return res
                .status(404) 
                .send({
                    message: "Trip not found with code " + req.params.tripCode
                }); 
        }
        res.send(trip); 
    }).catch(err => {
        if (err.kind === 'ObjectId') { 
            return res
                .status(404) 
                .send({
                    message: "Trip not found with code " + req.params.tripCode
                }); 
        }
        return res
            .status(500) // server error .json(err);
    }); 
}

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};