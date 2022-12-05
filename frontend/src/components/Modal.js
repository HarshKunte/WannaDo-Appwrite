import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import {IoSend} from 'react-icons/io5';
import { useNavigate } from "react-router-dom";
import TodosContext from "../TodosContext";
function Modal() {
  const {createTodo} = useContext(TodosContext);
  const navigate = useNavigate();

  //using this to close modal after creating todo
  const modalRef = useRef(false);

  const [title, setTitle] = useState("");
  const submitTodo = async(e) =>{
    e.preventDefault();
    console.log(title);
    await axios.post('/api/createTodo',{title})
    .then((res)=>{
      console.log(res);
      const todo = res.data.todo;

      //update context
      createTodo(todo);

      //close modal
      modalRef.current.checked = false

      navigate(`/todo/${todo._id}`)
    })
    //close modal
  }

  return (
    <React.Fragment>
      <input type="checkbox" ref={modalRef} id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-sm mb-3">Enter title for your new list.</h3>
          <div className="form-control">
            <form onSubmit={submitTodo} className="input-group">
              <input
                type="text"
                placeholder="New list"
                className="input input-bordered"
                onChange={(e)=>setTitle(e.target.value)}
              />
              <button className="btn btn-square">
                <IoSend />
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Modal;
