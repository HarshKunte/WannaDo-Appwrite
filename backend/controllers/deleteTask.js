const Todo = require('../model/todoModel')

exports.deleteTask = async (req, res) =>{
    try{
        // get id of todo to be updated
        const todoId = req.params.todoId
        if(typeof todoId != "string" || !todoId ){
            res.status(401).json({
                success:false,
                error: "Inavlid format of todoId"
            })
        }
        //get task id to be deleted from params
        const taskId = req.params.taskId
        if(typeof taskId != "string" || !taskId ){
            res.status(401).json({
                success:false,
                error: "Inavlid format of taskId"
            })
        }

        const todo = await Todo.findOneAndUpdate(
            { _id: todoId, "tasks":{"$elemMatch": { _id: taskId }}},
            { $pull: { tasks: { _id: taskId } } },
            
            {new:true}
          );
          console.log("todo is",todo);
        if(!todo){
            return res.status(401).json({
                success:false,
                error: "Todo or task doesnt exist!"
            })
        }
        res.status(201).json({
            success: true,
            message: "Task deleted successfully",
            todo,
        });
    } catch (error) {
        res.status(401).json({
            success:false,
            error
        })
    }
}