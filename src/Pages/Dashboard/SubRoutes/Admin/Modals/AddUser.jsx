import React from "react";

export default function AddUser({ setAddModal }) {
  return (
    <div
      className="backdrop"
      onClick={() => {
        setAddModal(false);
      }}
    >
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="AddUser">
          <div className="section_title">
            <h1>Add User</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
