const User = require("../models/User");

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find()
      .select("-__v")
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  //get user by id
  getUserByid({ params }, res) {
    User.findOne({ _id: params.id })
      .select("-__v")
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this given id" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // create user
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  //update user
  updateuser(req, res) {},

  //delete User
  deleteUser(req, res) {},
};

module.exports = userController;
