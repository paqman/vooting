const SELECT_POLL_ITEMS = `SELECT * FROM item WHERE idPoll = $idPoll`;
const SELECT_POLL_CRITERIAS = `SELECT * FROM criteria WHERE idPoll = $idPoll`;

/**
 * Return the items related to a poll
 * @param db
 * @param idPoll
 * @returns {Promise}
 */
function getPollItems(db, idPoll) {
  return new Promise((resolve, reject) => {
    return db.all(SELECT_POLL_ITEMS, {'$idPoll': idPoll}, (err, rows) => {
      if (err) {
        return reject(err);
      }
      console.log(rows.length);

      return resolve(rows);
    });
  });
}

/**
 * Return criterias for a poll
 * @param db
 * @param idPoll
 * @returns {Promise}
 */
function getPollCriterias(db, idPoll) {
  return new Promise((resolve, reject) => {
    return db.all(SELECT_POLL_CRITERIAS, {'$idPoll': idPoll}, (err, rows) => {
      if (err) {
        return reject(err);
      }

      return resolve(rows);
    });
  });
}

module.exports = {
  getPollItems,
  getPollCriterias
};