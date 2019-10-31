const mysql = require('mysql');
const pool  = mysql.createPool({
    timeout         : 2 * 60 * 60 * 1000,
    connectionLimit : 10,
    host            : 'www.db4free.net',
    user            : 'test_wk',
    password        : 'test_wk123',
    database        : 'test_wk'
});


const query = function(sql, data){
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) =>{
      if (err) throw err;
    
      // Use the connection
      connection.query(sql, data, (error, results) => {
        // When done with the connection, release it.
        connection.release();
    
        // Handle error after the release.
        if (error) {
          console.log(error);
          return reject(error);
        };
        console.log(JSON.stringify(results));
        resolve(results);
      });
    });
  })
}

module.exports = {query}