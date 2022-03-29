const Thought = require("../models/Thought");
const User = require("../models/User");

const thoughtController = {
  //get all thoughts
  getAllthoughts(req, res) {},

  //get single thought by id
  getThought(req, res) {},

  //create thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbuserdata) => {
        if (!dbuserdata) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbuserdata);
      })
      .catch((err) => res.json(err));
  },

  //update thought
  updateThought(req, res) {},

  //remove thought
  deleteThought(req, res) {},
};

module.exports = thoughtController;
