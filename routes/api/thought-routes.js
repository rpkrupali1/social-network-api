const router = require("express").Router();

const {
  getAllthoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllthoughts).post(createThought);
router.route("/:id").get(getThought).put(updateThought).delete(deleteThought);

module.exports = router;
