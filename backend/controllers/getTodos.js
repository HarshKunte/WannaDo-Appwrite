const Todo = require('../model/todoModel')

exports.getTodos = async (req, res) =>{
    try {
        const todos = await Todo.find();
        res.status(200).json({
            success: true,
            todos,
          });

    } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            message: error.message,
        })
    }
}
