import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import { BsFillBackspaceFill } from "react-icons/bs";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import TodosContext from "../TodosContext";

function ViewTodo() {
  const checkedRef = useRef(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { todos,user, updateTodos, updateUser } = useContext(TodosContext);
  const [todo, setTodo] = useState({});

  async function getTodo() {
    try {
      await axios
        .get(`/api/getTodo/${id}`)
        .then((res) => {
          setTodo(res.data.todo);
        })
        .catch((err) => toast.error(err));
    } catch (error) {
      toast.error(error);
    }
      await axios
        .get(`/api/getTodos/${user.id}`)
        .then((res) => {
          updateTodos(res.data.todos);
        })
        .catch((err) => toast.error(err));
    
  };

  const loadTodo = (todo) => {
    setTodo(todo);
    navigate(`/todo/${todo._id}`);
  };

  useEffect(() => {
    updateUser();
    if(user)
    getTodo();
    else
    navigate('/')
  },[]);

  
  return (
    <div className="drawer drawer-mobile">
      <input
        id="my-drawer-2"
        type="checkbox"
        ref={checkedRef}
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col">
        {/* Page content here */}
        <Navbar back />
        <Todo todo={todo} setTodo={setTodo}/>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu p-4 md:w-88 bg-base-300 text-base-content py-10">
          <button
            onClick={() => {
              checkedRef.current.checked = false;
            }}
            htmlFor="my-drawer-2"
            className="self-end lg:hidden drawer-button"
          >
            <BsFillBackspaceFill className="w-5 h-5" />
          </button>
          {/* Sidebar content here  */}
          <p className="text-2xl text-primary font-bold mb-2">Your lists</p>
          <p className="text-sm text-neutral-content mb-6 pr-2">
            Click on any list to view and manage tasks under it.
          </p>
          <ul className="menu bg-base-100 w-full ">
            {todos?.map((todo, index) => (
              <li className={todo._id === id ?`bordered rounded-none`:``} key={index} onClick={() => loadTodo(todo)}>
                <p >{todo.title}</p>
              </li>
            ))}
          </ul>
        </ul>
      </div>
    </div>
  );
}

export default ViewTodo;
