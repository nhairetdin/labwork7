var userHandler = {
  //Add the record in database, it adds record or row in Web SQL (SQLite)
  addUser: function (username, password) {
    // userid is username+password
    let userid = "" + username + password
    databaseHandler.db.transaction(
      function (tx) {
        tx.executeSql(
          "insert into user(_id, username, password) values(?, ?, ?)",
          [userid, username, password],
          function (tx, results) { },
          function (tx, error) {
            console.log("add user error: " + error.message);
          }
        );
      },
      function (error) { },
      function () { }
    );
  },
  getUser: function(userid) {
    databaseHandler.db.transaction(
      function(tx) {
        tx.executeSql(
          "SELECT * from user WHERE _id = ?",
          [userid],
          function(tx, results) {
            console.log(results)
            if(results.rows.length === 1) {
              openPage('tabs')
            }
          },
          function(tx, error) {
            console.log("get user error:", error)
          }
        );
      },
      function(error) {},
      function() {}
    )
  }
}