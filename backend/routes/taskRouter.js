const express = require('express');
const Task = require('../model/taskModel');
const router = express.Router();
const {getAllTasks, createTask, getTaskById, deleteTask, updateTask} = require('../controllers/tasksController');

// Get all tasks
router.get("/api/tasks/getalltasks", getAllTasks);

// Get task
router.get("/api/tasks/getTaskById/:id", getTaskById);

// Create a task
router.post("/api/tasks/create", createTask);

// Delete task
router.delete("/api/tasks/delete/:id", deleteTask);

// Update task
router.put("/api/tasks/update/:id", updateTask);

module.exports = router;