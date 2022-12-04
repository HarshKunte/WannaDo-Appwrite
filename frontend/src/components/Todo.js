import React, { useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import {MdModeEdit} from "react-icons/md"
import {TiDelete} from 'react-icons/ti';
import {BsTrash} from 'react-icons/bs';
function Todo() {
  const [disabled, setDisabled] = useState(true);
  const [nonDisabledIndex, setNonDisabledIndex] = useState(null)
  const inputReference = useRef(null);
  const taskInputReference = useRef(null);
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
  const submitTitle = (e) => {
    console.log(e.target.value);
    setDisabled(true);
  };
  const submitEditedTask = (e) => {
    console.log(e.target.value);
    setNonDisabledIndex(null);
  };
  const checkTask = () => {
    console.log("checked");
  };
  return (
    <div className="p-8 md:p-20 xl:p-20">
      <div className="">
        <input
          ref={inputReference}
          type="text"
          defaultValue="Todo title"
          className="block max-w-[360px] md:max-w-screen-sm font-bold outline-none text-4xl md:text-5xl text-primary px-2 bg-inherit focus:bg-base-300"
          disabled={disabled}
          onBlur={submitTitle}
        />
        <div className="flex items-center">
        <button
            
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

      <ul className="mt-10">
        {[0,1,2,3,4].map((item) =>(
        <li className="p-3 px-4 bg-base-300 max-w-lg rounded-lg flex items-center mb-4" key={item}>
          <input
            type="checkbox"
            checked="checked"
            onChange={checkTask}
            className="checkbox checkbox-sm checkbox-error mr-4"
          />
          <input className={item == nonDisabledIndex ? `bg-base-300 flex-1 pb-1 border-b-[1px] outline-none`:`outline-none bg-base-300 flex-1 pb-1 `}
            type="text"
            ref={item == nonDisabledIndex? taskInputReference: undefined}
            defaultValue="List item one"
            disabled={nonDisabledIndex!=item}
            onBlur={submitEditedTask}
          />
          <button onClick={()=> focusTaskInput(item)} tabIndex="0" className=""> <MdModeEdit className="text-error w-5 h-5"/></button>
          <button tabIndex="0" className=""> <TiDelete className="text-error ml-2 w-6 h-6"/></button>
         
        </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
