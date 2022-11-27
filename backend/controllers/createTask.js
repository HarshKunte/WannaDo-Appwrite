const Todo = require('../model/todoModel')

exports.createTask = async (req, res) =>{
    try {
        // receive id of todo from params in which task is to be added
        const todoId = req.params.todoId
        
        //get content of task from req.body
        const taskTitle = req.body.title

        //find todo in which the task is to be added
        const todo = await Todo.findById(todoId)

        if(!todo){
            res.status(401).json({
                success: false,
                error: "Todo doesn't exist."
            })
        }
        //push new task onto the existing tasks array
        todo.tasks.push({
            title: taskTitle,
            createdAt: new Date(),
            isCompleted: false
        })
        //update the todo in db
        todo.save();

        res.status(201).json({
            success: true,
            message: "Task Added Successfully",
            todo,
          });
    } catch (error) {
        res.status(401).json({
            success:false,
            error
        })
    }
}