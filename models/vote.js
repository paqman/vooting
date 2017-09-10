const INSERT_OR_UPDATE_VOTE = `INSERT OR REPLACE INTO
vote(idUser, idCriteria, idItem, rate, creationDate)
VALUES ($idUser, $idCriteria, $idItem, $rate, datetime())`;

const SELECT_VOTES = `SELECT v.*
FROM vote v, item i
WHERE i.idPoll = $idPoll
AND v.idUser = $idUser
AND v.idItem = i.idItem`;

function addOrUpdateVote(db, idUser, idCriteria, idItem, rate) {
  return new Promise((resolve, reject) => {

    const queryParams = {
      '$idUser': idUser,
      '$idCriteria': idCriteria,
      '$idItem': idItem,
      '$rate': rate
    };

    db.run(INSERT_OR_UPDATE_VOTE, queryParams, (err, result) => {
      if (err) {
        return reject(err)
      }

      console.log(result);
      resolve();
    });
  });
}

/**
 * Get the votes of a user for a poll
 * @param db
 * @param idPoll
 * @param idUser
 * @returns {Promise}
 */
function getPollVotes(db, idPoll, idUser) {
  return new Promise((resolve, reject) => {
    const params = {'$idPoll': idPoll, '$idUser': idUser};

    db.all(SELECT_VOTES, params, (err, rows) => {
      if (err) {
        return reject(err);
      }

      console.log(`found ${rows.length} votes.`);
      return resolve(rows);
    });
  });
}

module.exports = {
  addOrUpdateVote,
  getPollVotes
};