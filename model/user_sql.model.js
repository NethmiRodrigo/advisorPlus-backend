const sql = require("./db.js");


const User = (user) =>{
    this.UID = user.UID;
    this.name  = user.name;
    this.username = user.username;
    this.qualifications = user.qualifications;
    this.field_of_interset = user.field_of_interset;
}





module.exports = User;