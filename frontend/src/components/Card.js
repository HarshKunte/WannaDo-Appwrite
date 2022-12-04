import React from "react";
import { FaListUl } from "react-icons/fa";
import {BsCheckAll} from 'react-icons/bs';
function Card({todo}) {
  return (
    <div className="card w-32 sm:w-48 h-28 md:h-36 lg:w-56 lg:h-40 xl:w-64 xl:h-42 rounded-3xl bg-base-300 shadow-xl mb-6 lg:mb-8">
      <div className="card-body p-4 sm:p-6 overflow-y-hidden flex-col items-center justify-between md:justify-start md:items-start">
        <FaListUl className="md:hidden w-8 h-8 text-neutral-content" />
        <h2 className="text-sm xl:text-md font-bold sm:card-title text-primary font-mono">
          {todo?.title}
        </h2>
        {todo.tasks?.map((task, index)=>(
          task.isCompleted ? (<h5 key={index} className="hidden md:flex items-center text-xs xl:text-sm text-error">
          <BsCheckAll className="w-5 h-5 mr-1"/> {task.title}
         </h5>) : (
          <h5 key={index} className="hidden md:flex items-center text-xs xl:text-sm text-accent">
            {task.title}
         </h5>
         )
        ))}
        <div className="card-actions justify-end"></div>
      </div>
    </div>
  );
}

export default Card;
