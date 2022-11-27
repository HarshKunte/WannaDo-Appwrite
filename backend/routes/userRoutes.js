const express = require('express');
const { createTask } = require('../controllers/createTask');
const { createTodo } = require('../controllers/createTodo');
const { deleteTask } = require('../controllers/deleteTask');
const { deleteTodo } = require('../controllers/deleteTodo');
const { getTodo } = require('../controllers/getTodo');
const { getTodos } = require('../controllers/getTodos');
const { updateTask } = require('../controllers/updateTask');
const { updateTodo } = require('../controllers/updateTodo');
const router = express.Router();

//home route
router.get('/',(req,res)=>{
    res.send("Hello, welcome to home.")
})

//get Todos
router.get('/getTodos', getTodos)

//get single Todo
router.get('/getTodo/:todoId', getTodo)

//create todo
router.post('/createTodo', createTodo)

//create task and add it todo
router.post('/createTask/:todoId', createTask)

//update todo
router.post('/updateTodo/:todoId', updateTodo)

//update todo
router.post('/updateTask/:todoId', updateTask)

//delete task
router.delete('/deleteTask/:todoId/:taskId', deleteTask)

//delete todo
router.delete('/deleteTodo/:todoId', deleteTodo)
module.exports = router