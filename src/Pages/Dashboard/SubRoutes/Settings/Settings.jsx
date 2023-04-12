import React, { useRef, useState } from "react";
import "./Settings.css";
import avatar from "../../../../assets/images/avatar.svg";
import useUserCollection from "../../../../Hooks/useUserCollection";
import { useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
import { BsFillCameraFill } from "react-icons/bs";

export default function Settings() {
  const { updateUserDP } = useUserCollection();
  const { userData } = useSelector((state) => state.logindataslice);
  const{updateUserProfile}=useUserCollection();
  console.log(userData);

  const [feildData, setFeildData] = useState({
    // email: "brijraj@gmail.com",
    // img: "641bfa9f657183e50be7f5a5.jpg",
    // jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFiZmE5ZjY1NzE4M2U1MGJlN2Y1YTUiLCJlbWFpbCI6ImJyaWpyYWpAZ21haWwuY29tIiwiaWF0IjoxNjc5NjM5NjgzLCJleHAiOjE2Nzk2NDY4ODN9.ET19RTlX7TOr34AzqIDYxP0qhxyoXaB-CFf1A-p7inU",
    name: userData.name ? userData.name : "",
    contact_number: userData.contact_number ? userData.contact_number : "",
    // role_name: "Sr Devloper",
    // _id: "641bfa9f657183e50be7f5a5",
  });

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

  const mutateFeildData = (key, value) => {
    setFeildData((prev) => {
      let temp = prev;
      temp[key] = value;
      return temp;
    });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
   // console.log(feildData);
     updateUserProfile(feildData);
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
            <form className="form_contain" onSubmit={handleProfileUpdate}>
              <p className="input_label">Name</p>
              <input
                type="text"
                className="textbox"
                name="name"
                onChange={(e) => {
                  mutateFeildData("name", e.target.value.trim());
                }}
                defaultValue={`${userData.name}`}
              />
              <p className="input_label">Email</p>
              <input
                type="text"
                defaultValue={userData.email}
                className="textbox"
                name="assigenedate"
                disabled
              />
              <p className="input_label">Phone Number</p>
              <input
                type="number"
                defaultValue={userData.contact_number}
                className="textbox"
                name="assigenedate"
                onChange={(e) => {
                  mutateFeildData("contact_number", e.target.value.trim());
                }}
              />
              <p className="input_label">Designation</p>
              <input
                type="string"
                defaultValue={userData.role_name}
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
