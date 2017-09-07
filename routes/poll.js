const express = require('express');
const router = express.Router();

const pollModel = require('../models/poll')

let _db;


/* GET users listing. */
router.get('/', function (req, res, next) {

  return pollModel.getActivePoll(_db)
      .then(poll => res.send(poll));

  // _db.all(SELECT_ACTIVE_POLL, (err, rows) => {
  //   res.send(rows)
  // });

  // res.send({
  //   idPoll: 2,
  //   name: 'Apple bake',
  //   date: new Date(),
  //   status: 'OPEN'
  // });
});

module.exports = function (db) {
  _db = db;

  return router
};
