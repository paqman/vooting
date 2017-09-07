const SELECT_ACTIVE_POLL = `SELECT * FROM poll WHERE alias = $alias`;

function getActivePoll(db) {
  return new Promise((resolve, reject) => {
    console.log(SELECT_ACTIVE_POLL);


    db.all(SELECT_ACTIVE_POLL, { '$alias': CURRENT_POLL }, (err, rows) => {
      if (err) {
        reject(err)
      }

      resolve(rows)
    });

  });
}

module.exports = {
  getActivePoll
};