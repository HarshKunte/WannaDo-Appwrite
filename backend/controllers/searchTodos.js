const Todo = require('../model/todoModel')

exports.searchTodos = async (req, res) =>{
    try {
        const { q } = req.query;
        const userId = req.params.userId
        const todos = await Todo.find({'$or':[{ userId, title: { $regex: q, $options: 'i' } }, {userId, "tasks.title": { $regex: q, $options: 'i' } }]});
    
        res.status(201).json({
          status: 'success',
          message: 'Todos found!',
          todos,
        });
      } catch (error) {
        console.log(error)
        res.status(401).json({
            success: false,
            error: error.message,
        })
      }
}
