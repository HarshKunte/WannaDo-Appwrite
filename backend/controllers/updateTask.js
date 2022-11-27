const Todo = require('../model/todoModel')

exports.updateTask = async (req, res) =>{
    try{
        // get id of todo to be updated
        const todoId = req.params.todoId
        console.log(typeof todoId);

        if(typeof todoId != "string" || !todoId){
            res.status(401).json({
                success:false,
                error: "Invalid format of params.todoId"
            })
        }
        
        //receive entire updated task as an object from req.body
        const task = req.body.task
        // Add the current timestamp to updatedAt field
        task.updatedAt = new Date()

        if(typeof task != "object" || !task){
            res.status(401).json({
                success:false,
                error: "Task of type object expected."
            })
        }

        //set condition => todo id and task id matches
        const todo = await Todo.findOneAndUpdate({_id:todoId, "tasks":{"$elemMatch": { _id: task._id }}}, 
            {"$set": { "tasks.$": task}},

            //this should be set to true because findOneAndUpdate does not return the updated document,
            //instead it returns the original document
            {new: true}
        )

        if(!todo){
            res.status(401).json({
                success:false,
                error: "Todo doesnt exist!"
            })
        }
        
        res.status(201).json({
            success: true,
            message: "Todo updated successfully",
            todo
        });
    } catch (error) {
        res.status(401).json({
            success:false,
            error
        })
    }
}