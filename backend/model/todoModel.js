const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        maxlength: [25, "Name must not be more than 25 chars"],
    },  
    tasks: [{
        title:{
            type: String,
            trim:true,
            maxlength: [25, "Name must not be more than 25 chars"],
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: new Date()
        },
        updatedAt:{
            type:Date,
            default: null
        }
    },{timestamps: true}],
    
    
},{timestamps:true})

module.exports = mongoose.model('Todo', todoSchema)