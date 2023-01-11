const express = require('express');
const Task = require('../model/taskModel');
const router = express.Router();


// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ msg: error.message })
        console.log(error);
    }
};

// Get task by id
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
           return res.status(404).json(`No task for id ${id}`);
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message })
        console.log(error);
    }
};



// Create a task
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message })
        console.log(error);
    }
};

// Update task
const updateTask = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate(
            {_id: id}, req.body, {new: true}
        );

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message })
        console.log(error);
    }
};

// Update task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message })
        console.log(error);
    }
};




module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    deleteTask,
    updateTask, 
};