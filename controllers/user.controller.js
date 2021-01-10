const firebase = require("firebase");
const firebaseConfig = require("../config/fb_config");
const { User_Role } = require("../models");

//Utilities
const { isEmail } = require("../util/validations");

//Initialize firebase
firebase.initializeApp(firebaseConfig);

/* SIGNUP */
exports.signup = async (request, response) => {
  const new_user = {
    email: request.body.email,
    password: request.body.password,
  };

  //Validate email
  if (!new_user.email || !isEmail(new_user.email))
    return response.status(400).json({ error: { email: "Invalid email" } });

  //Validate password
  if (!new_user.password)
    return response
      .status(400)
      .json({ error: { password: "Invalid password" } });

  try {
    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(new_user.email, new_user.password);

    //UserID for SQL table
    const userID = data.user.uid;
    const token = await data.user.getIdToken();

    return response.status(201).json({ userID, token });
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      return response
        .status(400)
        .json({ error: { email: "Email is already in use!" } });
    } else {
      return response.status(500).json({ error });
    }
  }
};

//LOGIN
exports.login = async (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  };

  //Validate email
  if (!user.email)
    return response.status(400).json({ error: { email: "Invalid email" } });

  //Validate password
  if (!user.password)
    return response
      .status(400)
      .json({ error: { password: "Invalid password" } });

  try {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);

    //UserID for SQL table
    const userID = data.user.uid;
    const token = await data.user.getIdToken();

    const user_role = await User_Role.findAll({
      where: {
        user_id: userID,
      },
    });

    let roles = [];

    user_role.forEach((element) => {
      roles.push(element.role);
    });

    return response.status(200).json({ userID, token, roles });
  } catch (error) {
    return response.status(500).json({ error });
  }
};
