const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./test.db3');

(async () => {
  try {
    const users = await getMany(db, 'SELECT * FROM users', []);
    console.log(users);

    const amina = await getOne(db, 'SELECT * FROM users WHERE id = ?', [4]);
    console.log(amina);
  } catch (error) {
    console.log(error);
  }
})();

// db.all('SELECT * FROM users', [], (err, rows) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(rows);
//     const insertQuery = 'INSERT INTO users (name, sex, phone) VALUES (?,?,?)';
//     db.run(
//       insertQuery,
//       ['Safiya Abubakar', 'Female', '080555234545'],
//       (err) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log('Record inserted ...');
//         }
//       }
//     );
//   }
// });

function getMany(dbConn, query, params) {
  return new Promise((resolve, reject) => {
    dbConn.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function getOne(dbConn, query, params) {
  return new Promise((resolve, reject) => {
    dbConn.get(query, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function run(dbConn, query, params) {
  return new Promise((resolve, reject) => {
    dbConn.run(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
