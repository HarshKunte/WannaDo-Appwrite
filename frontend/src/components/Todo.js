import React, { useContext, useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import {MdModeEdit} from "react-icons/md"
import {TiDelete} from 'react-icons/ti';
import {IoSend} from 'react-icons/io5';
import {BsTrash} from 'react-icons/bs';
import TodosContext from "../TodosContext";
import axios from "axios";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
function Todo({todo, setTodo}) {

  const navigate = useNavigate();
  const {todos, updateTodos} = useContext(TodosContext);

  const inputReference = useRef(null);
  const taskInputReference = useRef(null);

  const [disabled, setDisabled] = useState(true);
  const [nonDisabledIndex, setNonDisabledIndex] = useState(null)

  const [taskTitle, setTaskTitle] = useState("")
  const [todoTitle, setTodoTitle] = useState("")




  const focusInput = () => {
    setTimeout(() => {
      inputReference.current.focus();
    }, 1);
    setDisabled(false);
  };
  const focusTaskInput = (i) => {
    setNonDisabledIndex(i);
    setTimeout(() => {
      taskInputReference.current.focus()
      
    }, 1);
  };
  const editTitle = async() => {
    setDisabled(true);
    
    await axios.post(`/api/updateTodo/${todo._id}`,{title: todoTitle})
    .then((res) =>{
      if(res.data.success){
        toast.success("Todo updated")
      }
      const updatedTodo = res.data.todo 
      console.log("updated",updatedTodo);
      const newTodos = todos.filter((funtodo)=>funtodo._id!==todo._id)
      console.log(newTodos);
      newTodos.push(updatedTodo)
      console.log(newTodos);

      updateTodos(newTodos)
      console.log("todos = ",todos);
      navigate(`/todo/${todo._id}`)
    })
    .catch(err =>{
      console.log(err);
      toast.error("Something went wrong.")
    })
  };

  //Delete todo
  const deleteTodo = async() =>{
    if(window.confirm("Are sure you want to delete this list?")){
    await axios.delete(`/api/deleteTodo/${todo._id}`)
    .then((res) =>{
      if(res.data.success){
        toast.success("Todo deleted!")
      }
      navigate('/')
      const newTodos = todos.filter((funtodo)=>funtodo._id!==todo._id)                       
      updateTodos(newTodos)

    })
    .catch(err =>{
      console.log(err);
      toast.error("Something went wrong.")
    })
  }
  }
   

  //Add task
  const addTask = async(e) =>{
    e.preventDefault();

    await axios.post(`/api/createTask/${todo._id}`,{title: taskTitle})
    .then((res) =>{
      
      if(res.data.success){
        toast.success("Task added!")
      }
      const updatedTodo = res.data.todo 
      setTodo(updatedTodo)
      const newTodos = todos.filter((funtodo)=>funtodo._id!==todo._id)
      newTodos.push(updatedTodo)                         
      updateTodos(newTodos)
      setTaskTitle("")
    })
    .catch(err =>{
      console.log(err);
      toast.error("Something went wrong.")
    })
  }

  //Delete Task
  const deleteTask = async(taskId) =>{
    await axios.delete(`/api/deleteTask/${todo._id}/${taskId}`)
    .then((res) =>{
      if(res.data.success){
        toast.success("Task deleted!")
      }
      const updatedTodo = res.data.todo 
      setTodo(updatedTodo)
      const newTodos = todos.filter((funtodo)=>funtodo._id!==todo._id)
      newTodos.push(updatedTodo)                         
      updateTodos(newTodos)

    })
    .catch(err =>{
      console.log(err);
      toast.error("Something went wrong.")
    })
  }


  //check uncheck task
  const checkUncheckTask =async(task) =>{
    
    const status = task.isCompleted
    task = {...task, isCompleted:!status}
    
    await axios.post(`/api/updateTask/${todo._id}`,{task})
    .then((res) =>{
      if(res.data.success && task.isCompleted===true){
        toast.success("Well done, you did it!")
      }
      const updatedTodo = res.data.todo
      setTodo(updatedTodo)
      const newTodos = todos.filter((funtodo)=>funtodo._id!==todo._id)
      newTodos.push(updatedTodo)                         
      updateTodos(newTodos)

    })
    .catch(err =>{
      console.log(err);
      toast.error("Something went wrong.")
    })
  }

  //edit task title
  const editTask =async(task) =>{
    setNonDisabledIndex(null)
    const updatedTitle = taskInputReference.current.value;

    task = {...task, title: updatedTitle}
    
    await axios.post(`/api/updateTask/${todo._id}`,{task})
    .then((res) =>{
      if(res.data.success){
        toast.success("Task updated")
      }
      const updatedTodo = res.data.todo
      setTodo(updatedTodo)
      const newTodos = todos.filter((funtodo)=>funtodo._id!==todo._id)
      newTodos.push(updatedTodo)                         
      updateTodos(newTodos)

    })
    .catch(err =>{
      console.log(err);
      toast.error("Something went wrong.")
    })
  }

  return (
    <div className="p-8 md:p-20 xl:p-20">
      <div className="">
        <p className="text-xs ml-2">Created on <span className="text-error">{dayjs(todo.createdAt).format('DD MMM YY')}</span></p>
        <input
          ref={inputReference}
          type="text"
          defaultValue={todo.title}
          onChange={(e)=>setTodoTitle(e.target.value)}
          className="block max-w-[360px] md:max-w-screen-sm font-bold outline-none text-4xl md:text-5xl xl:text-6xl text-primary px-2 bg-inherit focus:bg-base-300"
          disabled={disabled}
          onBlur={editTitle}
        />
        <div className="flex items-center">
        <button
            onClick={deleteTodo}
            className="btn btn-sm btn-ghost text-sm normal-case"
          >
            <BsTrash className="mr-1" /> Delete List
          </button>
        {disabled ? (
          <button
          onClick={focusInput}
          className="btn btn-sm btn-ghost text-sm normal-case"
          >
            <AiOutlineEdit className="mr-1" /> Edit title
          </button>
        ) : (
          <p className="text-sm ml-3">
            Click anywhere outside to save the changes
          </p>
        )}
        </div>
      </div>

      
      <form onSubmit={addTask} className="input-group mt-8">
      <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} type="text" placeholder="+ Add task" className="input input-bordered input-sm w-full max-w-xs" />
              <button type="submit" className="btn btn-sm">
                <IoSend className="text-xs"/>
              </button>
      </form>

      <ul className="mt-4">
        {todo.tasks?.filter((item) => !item.isCompleted).map((item) =>
           (<li className="p-3 px-4 bg-base-300 max-w-lg rounded-lg flex items-center mb-4 transition-all ease-in" key={item._id}>
            <input
              type="checkbox"
              defaultChecked={item?.isCompleted}
              onChange={()=>checkUncheckTask(item)}
              className="checkbox checkbox-sm checkbox-error mr-4"
            />
            <input className={item === nonDisabledIndex ? `bg-base-300 flex-1 pb-1 border-b-[1px] outline-none`:`outline-none bg-base-300 flex-1 pb-1 `}
              type="text"
              ref={item === nonDisabledIndex? taskInputReference: undefined}
              defaultValue={item?.title}
              disabled={nonDisabledIndex!==item}
              onBlur={()=>editTask(item)}
            />
            <button onClick={()=> focusTaskInput(item)} tabIndex="0" className=""> <MdModeEdit className="text-error w-5 h-5"/></button>
            <button tabIndex="0" className=""> <TiDelete onClick={()=>deleteTask(item._id)} className="text-error ml-2 w-6 h-6"/></button>
           
          </li>)                 
        )}
        {todo.tasks?.filter((item) => item.isCompleted).map((item) =>
           (<li className="p-3 px-4 bg-base-300 max-w-lg rounded-lg flex items-center mb-4 transition-all ease-in" key={item._id}>
            <input
              type="checkbox"
              defaultChecked={item?.isCompleted}
              onChange={()=>checkUncheckTask(item)}
              className="checkbox checkbox-sm checkbox-error mr-4"
            />
            <input className={item === nonDisabledIndex ? `bg-base-300 flex-1 pb-1 border-b-[1px] outline-none`:`outline-none bg-base-300 flex-1 pb-1 line-through`}
              type="text"
              ref={item === nonDisabledIndex? taskInputReference: undefined}
              defaultValue={item?.title}
              disabled={nonDisabledIndex!==item}
            />
            
            <button tabIndex="0" className=""> <TiDelete onClick={()=>deleteTask(item._id)} className="text-error ml-2 w-6 h-6"/></button>
           
          </li>)                 
        )}

      </ul>
    </div>
  );
}

export default Todo;
