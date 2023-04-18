import React, { useRef, useState } from "react";
import "../../Settings/settings.css";
import avatar from "../../../../../assets/images/avatar.svg";
import useUserCollection from "../../../../../Hooks/useUserCollection";
import imageCompression from "browser-image-compression";
import { BsFillCameraFill } from "react-icons/bs";
import Select from "react-select";
import { toast } from "react-toastify";

export default function EditUser({ setEditModal,EdituserData }) {
  const { updateUserDP } = useUserCollection();
  const [role, setRole] = useState(EdituserData.role_name);
  const { updateuser} = useUserCollection();
  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click();
  };
  console.log(EdituserData)
  let validImages = ["jpg", "jpeg", "png", "gif"];

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 600,
    useWebWorker: true,
  };

  const inputFileRef = useRef();

  const onFileChangeCapture = (e) => {
    console.log(e.target.files[0]);

    let fileName = e.target.files[0].name;

    let extention = fileName
      .substr(fileName.lastIndexOf(".") + 1)
      .toLowerCase();

    if (validImages.includes(extention)) {
      imageCompression(e.target.files[0], options).then((compressed) => {
        console.log(compressed, " compressed");
        console.log(e.target.files[0], " uncompressed");
        const compressedImage = new File([compressed], e.target.files[0].name);
        const formdata = new FormData();
        formdata.append("Id", userData._id);
        formdata.append("Image", compressedImage);
        console.log(formdata);
        /*Selected files data can be collected here.*/
        updateUserDP(formdata);
      });
    }
  };
  const optionsUser = [
    { value: "Sr Devloper", label: "Sr Devloper" },
    { value: "Jr devloper", label: "Jr devloper" },
  ];
  const handleAddProfile = (e) => {
    e.preventDefault();
    // console.log(feildData);
    //updateUserProfile(feildData);
    //console.log();
    const userData={
      name:e.target.username.value,
      email:e.target.userEmail.value,
      contact_number:e.target.userContact.value,
      role_name: role,
      _id:EdituserData._id
  };
  //console.log(userData);
  updateuser(userData).then((res)=>{
    toast.success("update user successfully");
    setEditModal(false);
  });
  }
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
        <div className="settings_contain">
            <div className="left">
              <div className="dp_contain" onClick={onBtnClick}>
                <img
                  src={
                    EdituserData.img
                      ? `${import.meta.env.VITE_SERVER}${EdituserData.img}`
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
              <form className="form_contain" onSubmit={handleAddProfile}>
                <p className="input_label">Name</p>
                <input type="text" className="textbox" name="username"  defaultValue={EdituserData.name}/>
                <p className="input_label">Email</p>
                <input type="text" className="textbox" name="userEmail" defaultValue={EdituserData.email}/>
                {/* <p className="input_label">Password</p>
                <input type="text" className="textbox" name="userPassword" defaultValue={EdituserData.contact_number} /> */}
                <p className="input_label">Phone Number</p>
                <input type="number" className="textbox"name="userContact" defaultValue={EdituserData.contact_number}/>
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
  );
}
