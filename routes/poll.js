const express = require('express');

const pollModel = require('../models/poll');
const itemModel = require('../models/item');
const voteModel = require('../models/vote');

const router = express.Router();

let _db;

/* [GET] active poll */
router.get('/', function (req, res, next) {
  return pollModel.getActivePoll(_db)
    .then(poll => {
      const pItems = itemModel.getPollItems(_db, poll.idPoll);
      const pCriterias = itemModel.getPollCriterias(_db, poll.idPoll);
      const pVotes = voteModel.getPollVotes(_db, poll.idPoll, res.locals.user);

      Promise.all([pItems, pCriterias, pVotes])
        .then(([items, criterias, votes]) => {
          items.forEach(item => {
            item.criterias = criterias.map(criteria => {
              const vote = votes.find(vote => vote.idCriteria === criteria.idCriteria && vote.idItem === item.idItem);
              if (vote !== undefined) {
                criteria.rate = vote.rate;
                criteria.vote = vote;
              }
              return criteria;
            });
          });

          res.send({poll, items, criterias});
        })
    });
});

module.exports = function (db) {
  _db = db;

  return router
};
