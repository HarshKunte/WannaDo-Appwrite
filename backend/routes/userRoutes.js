const express = require('express');
const { createTask } = require('../controllers/createTask');
const { createTodo } = require('../controllers/createTodo');
const { getTodos } = require('../controllers/getTodos');
const { updateTodo } = require('../controllers/updateTodo');
const router = express.Router();

//home route
router.get('/',(req,res)=>{
    res.send("Hello, welcome to home.")
})

//get Todos
router.get('/getTodos', getTodos)

//create todo
router.post('/createTodo', createTodo)

//create task and add it todo
router.post('/createTask/:todoId', createTask)

//update todo
router.post('/updateTodo/:todoId', updateTodo)
module.exports = router