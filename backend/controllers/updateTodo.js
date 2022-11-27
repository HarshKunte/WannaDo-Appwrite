const Todo = require('../model/todoModel')

exports.updateTodo = async (req, res) =>{
    try{
        // get id of todo to be updated
        const todoId = req.params.todoId
        console.log(todoId);
        // title to be updated
        const newTitle = req.body.title
        console.log(newTitle);
        const todo = await Todo.findByIdAndUpdate(todoId, {title: newTitle})
        if(!todo){
                res.status(401).json({
                    success: false,
                    error: "Something went wrong."
                })
        }
        res.status(201).json({
            success: true,
            message: "Todo updated successfully",
            todo,
        });
    } catch (error) {
        res.status(401).json({
            success:false,
            error
        })
    }
}