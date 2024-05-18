const express =require("express");
const { register, login } = require("../controllers/user");
const { createTask, getTask, getTaskById, updateTaskById, deleteTaskById } = require("../controllers/task");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.post("/register", register)
router.post("/login", login)


router.post("/tasks",isAuthenticated, createTask)
router.get("/tasks",isAuthenticated, getTask)
router.get("/task/:id",isAuthenticated, getTaskById)
router.put("/task/:id",isAuthenticated, updateTaskById)
router.delete("/task/:id",isAuthenticated, deleteTaskById)


module.exports = router