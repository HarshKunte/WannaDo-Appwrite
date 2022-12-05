import React from "react";
import { FaListUl } from "react-icons/fa";
import {BsCheckAll} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
function Card({todo}) {

  const navigate = useNavigate();

  const goToTodo = (todoId) =>{
      navigate(`/todo/${todoId}`)
  }

  return (
    <div onClick={()=>goToTodo(todo._id)} className="cursor-pointer card w-32 sm:w-48 h-28 md:h-36 lg:w-56 lg:h-40 xl:w-64 xl:h-42 rounded-3xl bg-base-300 shadow-xl mb-6 lg:mb-8">
      <div className="card-body p-4 sm:p-6 overflow-y-hidden flex-col items-center justify-between md:justify-start md:items-start">
        <FaListUl className="md:hidden w-8 h-8 text-neutral-content" />
        <h2 className="text-sm xl:text-md font-bold sm:card-title text-primary font-mono">
          {todo?.title}
        </h2>
        {todo.tasks?.filter((task) => task.isCompleted==false)
        .map((task, index)=>(
          <h5 key={index} className="hidden md:flex items-center text-xs xl:text-sm text-accent">
            {task.title}
         </h5>
        ))}
        {todo.tasks?.filter((task) => task.isCompleted==true)
        .map((task, index)=>(
          
         <h5 key={index} className="hidden md:flex items-center text-xs xl:text-sm text-error">
         {task.title} <BsCheckAll className="w-5 h-5 ml-1"/> 
        </h5>
         
        ))}
        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
}

export default Card;
