const INSERT_OR_UPDATE_VOTE = `INSERT OR REPLACE INTO
vote(idUser, idCriteria, idItem, rate, creationDate)
VALUES ($idUser, $idCriteria, $idItem, $rate, datetime())`;

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

module.exports = {
  addOrUpdateVote
};