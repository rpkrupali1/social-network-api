const router = require("express").Router();

const {
  getAllthoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  addreaction,
  deletereaction,
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/").get(getAllthoughts).post(createThought);

// /api/thoughts/:id
router.route("/:id").get(getThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addreaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deletereaction);

module.exports = router;
