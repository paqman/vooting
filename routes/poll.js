const express = require('express');

const pollModel = require('../models/poll');
const itemModel = require('../models/item');

const router = express.Router();

let _db;

/* [GET] active poll */
router.get('/', function (req, res, next) {
  return pollModel.getActivePoll(_db)
    .then(poll => {
      const pItems = itemModel.getPollItems(_db, poll.idPoll);
      const pCriterias = itemModel.getPollCriterias(_db, poll.idPoll);

      Promise.all([pItems, pCriterias])
        .then(([items, criterias]) => {
          res.send({poll, items, criterias});
        })
    });
});

module.exports = function (db) {
  _db = db;

  return router
};
