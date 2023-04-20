import React, { useRef, useState } from "react";
import "./EditUser.css";
import Select from "react-select";
import { toast } from "react-toastify";
import useUserCollection from "../../../../../../Hooks/useUserCollection";
import Loading from "../../../../../../UniversalComponents/Loading/Loading";
import DBlottie from "../../../../../../assets/Lottie/database.json";

export default function EditUser({ setEditModal, EdituserData }) {
  const [role, setRole] = useState(EdituserData.role_name);
  const { updateuser } = useUserCollection();

  console.log(EdituserData);

  const optionsUser = [
    { value: "Sr Devloper", label: "Sr Devloper" },
    { value: "Jr devloper", label: "Jr devloper" },
  ];
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // console.log(feildData);
    //updateUserProfile(feildData);
    //console.log();
    const userData = {
      name: e.target.username.value,
      email: e.target.userEmail.value,
      contact_number: e.target.userContact.value,
      role_name: role,
      _id: EdituserData._id,
    };
    //console.log(userData);
    updateuser(userData).then((res) => {
      toast.success("update user successfully");
      setEditModal(false);
    });
  };
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
          <div className="settings_contain">
            <div className="left">
              <Loading isLoading={true} display={DBlottie} />
            </div>
            <div className="right">
              <form className="form_contain" onSubmit={handleUpdateProfile}>
                <p className="input_label">Name</p>
                <input
                  type="text"
                  className="textbox"
                  name="username"
                  defaultValue={EdituserData.name}
                />
                <p className="input_label">Email</p>
                <input
                  type="text"
                  className="textbox"
                  name="userEmail"
                  defaultValue={EdituserData.email}
                />
                {/* <p className="input_label">Password</p>
                <input type="text" className="textbox" name="userPassword" defaultValue={EdituserData.contact_number} /> */}
                <p className="input_label">Phone Number</p>
                <input
                  type="number"
                  className="textbox"
                  name="userContact"
                  defaultValue={EdituserData.contact_number}
                />
                <p className="input_label">Designation</p>
                <Select
                  options={optionsUser}
                  onChange={(role) => {
                    setRole(role.value);
                  }}
                  defaultValue={EdituserData.role_name}
                  placeholder={EdituserData.role_name}
                />
                {console.log(EdituserData.role_name)}
                <button type="submit" className="update_profile">
                  Edit User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
