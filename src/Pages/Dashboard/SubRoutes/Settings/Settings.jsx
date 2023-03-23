import React, { useRef } from "react";
import "./Settings.css";
import avatar from "../../../../assets/images/avatar.svg";
import useUserCollection from "../../../../Hooks/useUserCollection";
import { useSelector } from "react-redux";
import { BsFillCameraFill } from "react-icons/bs";

export default function Settings() {
  const { updateUserDP } = useUserCollection();
  const { userData } = useSelector((state) => state.logindataslice);

  const inputFileRef = useRef();
  const onFileChangeCapture = (e) => {
    console.log(e.target.files[0]);
    const formdata = new FormData();
    formdata.append("Id", userData._id);
    formdata.append("Image", e.target.files[0]);
    console.log(formdata);
    /*Selected files data can be collected here.*/
    updateUserDP(formdata);
  };
  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click();
  };
  return (
    <>
      <div className="settings">
        <div className="section_title">
          <h1>Settings</h1>
        </div>
        <div className="settings_contain">
          <div className="left">
            <div className="dp_contain" onClick={onBtnClick}>
              <img
                src={
                  userData.img
                    ? `${import.meta.env.VITE_SERVER}${userData.img}`
                    : avatar
                }
                alt=""
              />
              <div className="dp_overlay">
                <div className="overlay_contain">
                  <BsFillCameraFill className="overlay_icon" />
                  <p>Update Image</p>
                </div>
              </div>
              <input
                name="image"
                type="file"
                ref={inputFileRef}
                onChangeCapture={onFileChangeCapture}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="right">
            <form className="form_contain">
              <p className="input_label">Name</p>
              <input
                type="text"
                className="textbox"
                name="name"
                value={`${userData.name}`}
              />
              <p className="input_label">Email</p>
              <input
                type="text"
                value={userData.email}
                className="textbox"
                name="assigenedate"
                disabled
              />
              <p className="input_label">Phone Number</p>
              <input
                type="number"
                className="textbox"
                name="assigenedate"
                required
              />
              <p className="input_label">Designation</p>
              <input
                type="string"
                value={userData.role_name}
                className="textbox"
                name="assigenedate"
                disabled
              />
              <button type="submit" className="update_profile">
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
