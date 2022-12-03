import React, { useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
function Todo() {
  const [disabled, setDisabled] = useState(true);
  const inputReference = useRef(null);
  const focusInput = () =>{
    setTimeout(() => {
        inputReference.current.focus();
    }, 1);
    setDisabled(false)
  }
  const submitTitle = (e) =>{
    console.log(e.target.value);
    setDisabled(true)
  }
  const checkTask = () =>{
    console.log("checked");
  }
  return (
    <div className="p-20">
      <div className="">
        <input
        ref= {inputReference}
          type="text"
          defaultValue="Todo title"
          className="block w-fit font-bold outline-none text-5xl text-primary px-2 bg-inherit focus:bg-base-300"
          disabled={disabled}
          onBlur={submitTitle}
        />
        {
            disabled?(
                <button
                onClick={focusInput}
                 className="btn btn-sm btn-ghost text-sm normal-case">
                  <AiOutlineEdit className="mr-1" /> Edit title
                </button>
                
            ):(
                <p className="text-sm ml-3">Click anywhere outside to save the changes</p>
            )
        }
        
      </div>

      <ul className="mt-10">
        <li className="p-3 px-4 bg-base-300 max-w-lg rounded-lg flex items-center mb-4">
        <input type="checkbox" checked="checked" onChange={checkTask} className="checkbox checkbox-sm checkbox-error mr-4" />
            List item one
        </li>
        <li className="p-3 px-4 bg-base-300 max-w-lg rounded-lg flex  mb-4">
        <input type="checkbox" checked="" onChange={checkTask} className="checkbox checkbox-sm checkbox-error mr-4" />
            List item one
        </li>
        <li className="p-3 px-4 bg-base-300 max-w-lg rounded-lg flex mb-4">
        <input type="checkbox" checked="" onChange={checkTask} className="checkbox checkbox-sm checkbox-error mr-4" />
            List item one
        </li>
        <li className="p-3 px-4 bg-base-300 max-w-lg rounded-lg flex mb-4">
        <input type="checkbox" checked="" onChange={checkTask} className="checkbox checkbox-sm checkbox-error mr-4" />
            List item one
        </li>

            
      </ul>
    </div>
  );
}

export default Todo;
