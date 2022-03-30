const User = require("../models/User");

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find()
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  //get user by id
  getUserByid({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
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
  updateuser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //delete User
  deleteUser(req, res) {},

  //add friend
  addFriend(req, res) {},

  //delete friend
  deleteFriend(req, res) {},
};

module.exports = userController;
