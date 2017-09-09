const SELECT_ACTIVE_POLL = `SELECT * FROM poll WHERE alias = $alias`;
const SELECT_LATEST_POLL = `SELECT * FROM poll ORDER BY creationDate LIMIT 1`;

function getActivePoll(db) {
  return new Promise((resolve, reject) => {
    const query = CURRENT_POLL === undefined ? SELECT_LATEST_POLL : SELECT_ACTIVE_POLL;

    db.all(query, {'$alias': CURRENT_POLL}, (err, rows) => {
      if (err) {
        return reject(err);
      }

      if (rows.length === 1) {
        return resolve(rows[0]);
      }

      return reject(`ERROR: Too many polls (${rows.length}): ${rows}`);
    });
  });
}

module.exports = {
  getActivePoll
};