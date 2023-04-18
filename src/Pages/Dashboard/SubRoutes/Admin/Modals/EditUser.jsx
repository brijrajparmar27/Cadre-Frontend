import React from "react";

export default function EditUser({ setEditModal }) {
  return (
    <div
      className="backdrop"
      onClick={() => {
        setEditModal(false);
      }}
    >
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="EditUser">
          <div className="section_title">
            <h1>Edit User</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
