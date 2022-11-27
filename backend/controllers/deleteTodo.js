const Todo = require('../model/todoModel')

exports.deleteTodo = async (req, res) =>{
    try{
        // get id of todo to be deleted
        const todoId = req.params.todoId
        if(typeof todoId != "string" || !todoId ){
            res.status(401).json({
                success:false,
                error: "Inavlid format of todoId"
            })
        }

        const todo = await Todo.findByIdAndDelete(todoId);
          console.log("todo is",todo);
        if(!todo){
            return res.status(401).json({
                success:false,
                error: "Todo doesnt exist!"
            })
        }
        res.status(201).json({
            success: true,
            message: "Todo deleted successfully",
            todo,
        });
    } catch (error) {
        res.status(401).json({
            success:false,
            error
        })
    }
}