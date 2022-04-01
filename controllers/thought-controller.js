const Thought = require("../models/Thought");
const User = require("../models/User");

const thoughtController = {
  //get all thoughts
  getAllthoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(400).json(err));
  },

  //get single thought by id
  getThought({ params }, res) {
    Thought.findById(params.id)
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

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
      .catch((err) => res.status(400).json(err));
  },

  //update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true , runValidators: true})
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //remove thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((deleteThought) => {
        if (!deleteThought) {
          res.status(404).json({ message: "There is no thought with this id" });
          return;
        }
        return User.findByIdAndUpdate(
          { _id: deleteThought.userId },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          res
            .status(404)
            .json({
              message: "Thought is deleted but No user found with this thought",
            });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //create reactions
  addreaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //delete reactions
  deletereaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;
