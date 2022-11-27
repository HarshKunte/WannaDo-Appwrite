const Todo = require('../model/todoModel')

exports.getTodo = async (req, res) =>{
    try {
        const todoId = req.params.todoId
        if(typeof todoId != "string" || !todoId ){
            return res.status(401).json({
                success:false,
                error: "Inavlid format of todoId"
            })
        }
        const todo = await Todo.findById(todoId);
        if(!todo){
            return res.status(401).json({
                success: false,
                error: "Todo doesnt exist!!",
            })
        }
        res.status(200).json({
            success: true,
            todo,
          });

    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            error: error.message,
        })
    }
}
