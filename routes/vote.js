const express = require('express');
const uuid = require('uuid');

const voteModel = require('../models/vote');

const router = express.Router();

let _db;

// TODO : Handler user ID
const idUser = uuid.v1();

/* [GET] create or update vote*/
router.post('/', function (req, res, next) {
  const {idCriteria, idItem, vote} = req.body;

  if (!isValid(idUser) || !isValid(idCriteria) || !isValid(idItem)) {
    return res.status(400).send({message: 'A value is missing.'})

  }
  if (!isValid(vote) || vote < 0 || vote > 10) {
    return res.status(400).send({message: 'Vote is not valid.'})
  }

  return voteModel.addOrUpdateVote(_db, idUser, idCriteria, idItem, vote)
    .then(result => res.send({}))
    .catch(err => {
      console.log(err)
      res.status(500).send({message: err})
    });
});

function isValid(val) {
  return val !== undefined && val !== null && val !== '';
}

module.exports = function (db) {
  _db = db;

  return router
};
