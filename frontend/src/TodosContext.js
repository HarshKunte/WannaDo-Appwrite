import { createContext, useContext, useState } from "react";

const TodosContext = createContext();

export function TodosProvider({children}){

    const [todos, setTodos] = useState([])

    const createTodo = (todo) =>{
        setTodos((prevState) => [...prevState, todo])
    }

    const updateTodos = (todos) =>{
        setTodos(todos)
    }

    return <TodosContext.Provider value={{todos, createTodo, updateTodos}}>
        {children}
    </TodosContext.Provider>
}

export default TodosContext