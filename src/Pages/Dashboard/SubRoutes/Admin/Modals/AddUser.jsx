import React, { useRef, useState } from "react";
import "../../Settings/settings.css";
import avatar from "../../../../../assets/images/avatar.svg";
import useUserCollection from "../../../../../Hooks/useUserCollection";
import { useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
import { BsFillCameraFill } from "react-icons/bs";
import Select from "react-select";
import useAuth from "../../../../../Hooks/useAuth";
import { toast } from "react-toastify";
import useSendmail from "../../../../../Hooks/useSendmail";

export default function AddUser({ setAddModal }) {
  const { updateUserDP } = useUserCollection();
  const [role, setRole] = useState(null);
  const { updateUserProfile } = useUserCollection();
  const { Signup } = useAuth();
  const {sendmail}=useSendmail();

  // const [feildData, setFeildData] = useState({
  //   // email: "brijraj@gmail.com",
  //   // img: "641bfa9f657183e50be7f5a5.jpg",
  //   // jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFiZmE5ZjY1NzE4M2U1MGJlN2Y1YTUiLCJlbWFpbCI6ImJyaWpyYWpAZ21haWwuY29tIiwiaWF0IjoxNjc5NjM5NjgzLCJleHAiOjE2Nzk2NDY4ODN9.ET19RTlX7TOr34AzqIDYxP0qhxyoXaB-CFf1A-p7inU",
  //   name: userData.name ? userData.name : "",
  //   contact_number: userData.contact_number ? userData.contact_number : "",
  //   // role_name: "Sr Devloper",
  //   // _id: "641bfa9f657183e50be7f5a5",
  // });

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

  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click();
  };
  const handleAddProfile = (e) => {
    e.preventDefault();
    // console.log(feildData);
    //updateUserProfile(feildData);
    const userData = {
      name: e.target.username.value,
      email: e.target.userEmail.value,
      contact_number: e.target.userContact.value,
      password: e.target.userPassword.value,
      role_name: role,
    };
    //console.log(userData);
    Signup(userData).then((res) => {
      sendmail({
        name:e.target.userEmail.value ,
        subject:'credentials cardre',
        message:`your email:-${e.target.userEmail.value},
                 your password:-${e.target.userPassword.value}`,
      });
      toast.success("successfully Add new");
      setAddModal(false);
    });
  };
  const optionsUser = [
    { value: "Sr Devloper", label: "Sr Devloper" },
    { value: "Jr devloper", label: "Jr devloper" },
  ];
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
          <div className="settings_contain">
            <div className="left">
              <div className="dp_contain" onClick={onBtnClick}>
                <img src={avatar} alt="" />
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
                <input type="text" className="textbox" name="username" />
                <p className="input_label">Email</p>
                <input type="text" className="textbox" name="userEmail" />
                <p className="input_label">Password</p>
                <input type="text" className="textbox" name="userPassword" />
                <p className="input_label">Phone Number</p>
                <input type="number" className="textbox" name="userContact" />
                <p className="input_label">Designation</p>
                <Select
                  options={optionsUser}
                  onChange={(role) => {
                    setRole(role.value);
                  }}
                />
                <button type="submit" className="update_profile">
                  Add User
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
