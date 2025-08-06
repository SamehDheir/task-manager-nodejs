const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);  

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
