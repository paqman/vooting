export default class ApiService {
  static getPoll() {
    return new Promise((resolve, reject) => {
      fetch('/api/poll', {
        method: 'GET',
        credentials: 'same-origin'
      })
        .then(function (response) {
          if (response.status === 200) {
            response.json()
              .then(function (res) {
                return resolve(res);
              });
          } else {
            return reject(`[${response.statusText}] An error occurred : ${res}`);
          }
        })
        .catch(function (error) {
          console.error(error);
          return reject(`An error occurred : ${error}`);
        });
    });
  };


  static vote(idItem, idCriteria, vote) {
    console.log(`Vote: ${idItem}, ${idCriteria}, ${vote}`);

    return new Promise((resolve, reject) => {
      fetch(`/api/vote/${idItem}/criteria/${idCriteria}`, {
        method: 'POST',
        body: JSON.stringify({vote}),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      })
        .then(function (response) {
          if (response.status === 200) {
            response.json()
              .then(function (res) {
                return resolve(res);
              });
          } else {
            response.json()
              .then(function (res) {
                return reject(`[${response.statusText}] An error occurred : ${JSON.stringify(res)}`);
              });
          }
        })
        .catch(function (error) {
          console.error(error);
          return reject(`An error occurred : ${error}`);
        });
    });

  }
}