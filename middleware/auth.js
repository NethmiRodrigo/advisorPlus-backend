const jwt = require("jsonwebtoken");
const { User_Profile, Advisor_Profile } = require("../models");
const { admin } = require("../util/admin");

/* Use as below

    auth() - both user types
    auth("user") - only members with "user_profiles"
    auth("advisor") - only members with "advisor_profiles"

*/

module.exports = (role) => async (request, response, next) => {
  let token;
  if (
    //Check if bearer token exists
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer ")
  ) {
    //Get bearer token
    token = request.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return response.status(403).json({ error: "Unauthoraized" });
  }

  let id;

  //Verify token
  try {
    let decodedToken = await admin.auth().verifyIdToken(token);
    id = decodedToken.uid;
  } catch (error) {
    return response.status(403).json({ error: "Unauthoraized" });
  }

  let user;

  try {
    //Auth for routes only available to adviosrs
    if (role === "advisor") {
      user = await Advisor_Profile.findByPk(id);
      if (!user) {
        return response.status(403).json({ error: "Unauthoraized" });
      }
    }

    //Auth for routes only available to users
    if (role === "user") {
      user = await User_Profile.findByPk(id);
      if (!user) {
        return response.status(403).json({ error: "Unauthoraized" });
      }
    }
  } catch (error) {
    return response.status(500).json({ error });
  }

  request.user = { uid: id }; //In all controllers you can access user_id of whomever is calling the request using `request.user.uid`

  return next();
};
