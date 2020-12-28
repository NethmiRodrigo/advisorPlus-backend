const connection = require("../util/db.js");

const User = function (user) {
  this.UID = user.UID;
  this.name = user.name;
  this.username = user.username;
  this.gender = user.gender;
  this.date_of_birth = user.date_of_birth;
  this.date_of_registration = user.date_of_registration;
  this.status_id = user.status_id;
  this.image;
};

User.create = (newUser, result) => {
  try {
    connection.query(
      "CALL add_user(?,?,?,?,?,?,?,?)",
      [
        newUser.UID,
        newUser.name,
        newUser.username,
        newUser.gender,
        newUser.date_of_birth,
        newUser.date_of_registration,
        newUser.status_id,
        newUser.image,
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        result(null, newUser);
      }
    );
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

User.findById = (UID, result) => {
  try {
    connection.query("CALL get_users(?)", [UID], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
      }
    });
  } catch (err) {
    console.log("error: ", err);
  }
};

User.updateById = (UID, user, result) => {
  try {
    //const request = new connection.request();
    // res = await request.execute('get_users'); // placeholder for the procedure name
    if (res) result(null, res[0]);

    return;
  } catch (err) {
    console.log("error: ", err);
    result(err, null);
  }
};

User.deleteById = (UID, result) => {
  try {
    connection.query("CALL delete_user(?)", [UID], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, res);
    });
  } catch (err) {
    console.log("error: ", err);
  }
};
module.exports = User;
