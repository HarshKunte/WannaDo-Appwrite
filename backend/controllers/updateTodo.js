const Todo = require('../model/todoModel')

exports.updateTodo = async (req, res) =>{
    try{
        // get id of todo to be updated
        const todoId = req.params.todoId
        if(typeof todoId != "string" || !todoId){
            return res.status(401).json({
                success:false,
                error: "Inavlid format of params.todoId"
            })
        }
        console.log(todoId);
        // title to be updated
        const newTitle = req.body.title
        console.log(typeof newTitle);
        if(typeof newTitle != 'string' || !newTitle){
            return res.status(401).json({
                success:false,
                error: "Invalid format of title"
            })
        }
        const todo = await Todo.findByIdAndUpdate(todoId, {title: newTitle}, {new: true})
        if(!todo){
                return res.status(401).json({
                    success: false,
                    error: "Something went wrong."
                })
        }
        return res.status(201).json({
            success: true,
            message: "Todo updated successfully",
            todo,
        });
    } catch (error) {
        return res.status(401).json({
            success:false,
            error
        })
    }
}