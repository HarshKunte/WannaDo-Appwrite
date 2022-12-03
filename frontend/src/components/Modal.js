import React from "react";
import {IoSend} from 'react-icons/io5';
function Modal() {
  return (
    <React.Fragment>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
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
            <div className="input-group">
              <input
                type="text"
                placeholder="New list"
                className="input input-bordered"
              />
              <button className="btn btn-square">
                <IoSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Modal;
