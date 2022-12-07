import { createContext, useContext, useState } from "react";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const TodosContext = createContext();

export function TodosProvider({children}){

    const [todos, setTodos] = useState([])

    const createTodo = (todo) =>{
        setTodos((prevState) => [...prevState, todo])
    }

    const updateTodos = (todos) =>{
        const newTodos = todos.map(todo =>{
            const newTasks = todo.tasks.map(task => {
                if(task.updatedAt)
                return {...task, relativeDate : dayjs(task.updatedAt).fromNow()}
                else
                return {...task, relativeDate : dayjs(task.createddAt).fromNow()}
            })
            if(todo.updatedAt)
                return {...todo, relativeDate : dayjs(todo.updatedAt).fromNow(), tasks:newTasks}
                else
                return {...todo, relativeDate : dayjs(todo.createddAt).fromNow(), tasks: newTasks}
        })
        console.log("New todos,", newTodos);
        setTodos(newTodos)
    }

    return <TodosContext.Provider value={{todos, createTodo, updateTodos}}>
        {children}
    </TodosContext.Provider>
}

export default TodosContext