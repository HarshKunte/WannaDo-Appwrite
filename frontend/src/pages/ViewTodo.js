import React from "react";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
function ViewTodo() {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Page conent here */}
        <Navbar back />
        <Todo />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-88 bg-base-300 text-base-content py-10">
          {/* Sidebar content here  */}
          <p className="text-2xl text-primary font-bold mb-2">Your lists</p>
          <p className="text-sm text-neutral-content mb-6 pr-2">
            Click on any list to view and manage tasks under it.
          </p>
          <ul className="menu bg-base-100 w-full ">
            <li>
              <a>Item 1</a>
            </li>
            <li className="bordered">
              <a>I have border</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
}

export default ViewTodo;
