const router = require("express").Router();
const {
  getAllUsers,
  getUserByid,
  createUser,
  updateuser,
  deleteUser,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserByid).put(updateuser).delete(deleteUser);

module.exports = router;
