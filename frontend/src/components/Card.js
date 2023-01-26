import React, { useEffect, useState } from "react";
import { FaListUl } from "react-icons/fa";
import {BsCheckAll} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
function Card({todo}) {

  const [remainingTasks, setRemainingTasks] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)
  const navigate = useNavigate();

  const goToTodo = (todoId) =>{
      navigate(`/todo/${todoId}`)
  }
  
  useEffect(()=>{
    (function calcTasks(){
      let compTasks = 0;
      let remTasks = 0;
        todo.tasks?.map(task => {
            if(task.isCompleted)
             return compTasks +=1
            else
              return remTasks +=1
        });
        setCompletedTasks(compTasks)
        setRemainingTasks(remTasks)
    }())
  },[todo])
  return (
    <div onClick={()=>goToTodo(todo._id)} className="cursor-pointer card w-32 sm:w-48 h-28 md:h-36 lg:w-56 lg:h-40 xl:w-64 xl:h-42 rounded-3xl bg-base-300 shadow-xl mb-6 lg:mb-8">
      <div className="card-body p-4 sm:p-6 overflow-hidden flex-col items-center justify-between md:justify-start md:items-start">
        <FaListUl className="md:hidden w-8 h-8 text-neutral-content" />
        
        <p className="text-sm lg:text-2xl font-bold text-center  text-primary font-mono">
          {todo?.title}
        </p>
      
        <h5  className="hidden md:flex items-center text-xs xl:text-sm text-accent">
          {remainingTasks} remaining
        </h5>
        <h5  className="hidden md:flex items-center text-xs xl:text-sm text-error">
         {completedTasks} completed <BsCheckAll className="w-5 h-5 ml-1"/></h5> 
        <div className="hidden md:block card-actions justify-end mt-2 text-xs text-gray-400">
          updated {todo.relativeDate}
        </div>
      </div>
    </div>
  );
}

export default Card;
