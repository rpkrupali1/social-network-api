const Thought = require("../models/Thought");
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
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No used found with this id" });
          return;
        }
        //delete all associated thoughts if any
        Thought.deleteMany({ userId: params.id }).then((thoughtData) => {
          res.json({
            message: "User and associated all thoughts deleted",
            userData,
            deletedThoughtCounts: thoughtData.deletedCount,
          });
        });
      })
      .catch((err) => res.status(400).json(err));
  },

  //add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //delete friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
        { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
