import { createContext, useState } from "react";
import account from "./config/appwrite";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const TodosContext = createContext();

export function TodosProvider({children}){

    const [todos, setTodos] = useState([])
    const [user, setUser] = useState(null)

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
        setTodos(newTodos)
    }

    const updateUser = () =>{
        const promise = account.get()
        promise.then((user)=>{
            console.log(user.$id);
            setUser({name: user.name, id: user.$id, email: user.email})
        }).catch(err =>{
            setUser(null)
        })
    }

    return <TodosContext.Provider value={{todos, createTodo, updateTodos, user, updateUser}}>
        {children}
    </TodosContext.Provider>
}

export default TodosContext