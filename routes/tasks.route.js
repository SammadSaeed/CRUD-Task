const express = require('express');
const taskRouter = express.Router();
const { getTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/tasks.controller');
const authMiddleware = require('../middleware/authMiddleware');
const paginationMiddleware = require('../middleware/paginationMiddleware');

// For Public
taskRouter.get('/',paginationMiddleware(),getTasks);
taskRouter.get('/:taskId', getTask);

// Protected
taskRouter.post('/', authMiddleware, createTask);
taskRouter.patch('/:taskId', authMiddleware, updateTask);
taskRouter.delete('/:taskId', authMiddleware,deleteTask);

module.exports = taskRouter;