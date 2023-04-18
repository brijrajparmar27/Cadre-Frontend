import React, { useEffect, useState } from "react";
import "./AllUsers.css";
import useUserCollection from "../../../../Hooks/useUserCollection";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPen, BsPlusLg } from "react-icons/bs";
import avatar from "../../../../assets/images/avatar.svg";
import Swal from "sweetalert2";
import AddUser from "./Modals/AddUser";
import EditUser from "./Modals/EditUser";

function AllUsers() {
  const { getAlluser, userdata, deletuser } = useUserCollection();
  const [AddModal, setAddModal] = useState(false);
  const [EditModal, setEditModal] = useState(false);
  const [EditUserData,setEdituserData]=useState(false);
  useEffect(() => {
    getAlluser();
  }, [AddModal,EditModal]);
  const clickdeleteuser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletuser(id);
        toast.success("delete users successfully");
        getAlluser();
      }
    });
  };
  
  return (
    <div className="users">
      <div className="section_title">
        <h1>Users</h1>
        <button
          className="add_timesheet btn"
          onClick={() => {
            setAddModal(true);
          }}
        >
          <BsPlusLg className="add_btn" />
          Add User
        </button>
      </div>

      {AddModal && <AddUser setAddModal={setAddModal} />}
      {EditModal && EditUserData && <EditUser setEditModal={setEditModal} EdituserData={EditUserData} />}

      <div className="container">
        <div className="table">
          <div className="table-header">
            <div className="header__item">
              <a id="name" className="filter__link" href="#">
                Name
              </a>
            </div>

            <div className="header__item">
              <a id="name" className="filter__link" href="#">
                Email
              </a>
            </div>
            <div className="header__item">
              <a
                id="wins"
                className="filter__link filter__link--number"
                href="#"
              >
                Role Name
              </a>
            </div>
            <div className="header__item">
              <a
                id="draws"
                className="filter__link filter__link--number"
                href="#"
              >
                Contact
              </a>
            </div>
            <div className="header__item">
              <a
                id="losses"
                className="filter__link filter__link--number"
                href="#"
              >
                Action
              </a>
            </div>
          </div>
          {userdata && userdata.length > 0
            ? userdata.map((res) => {
                return (
                  <div className="table-content">
                    <div className="table-row">
                      <div className="table-data">{res.name}</div>
                      <div className="table-data">{res.email}</div>
                      <div className="table-data">{res.role_name}</div>
                      <div className="table-data">{res.contact_number}</div>
                      <div className="table-data user_actions">
                        <BsPen
                          className="proj_fun_icons"
                          onClick={() => {
                            setEditModal(true);
                            setEdituserData(res)
                          }}
                        />
                        <AiOutlineDelete
                          className="proj_fun_icons"
                          onClick={() => {
                            clickdeleteuser(res._id);
                          }}
                        ></AiOutlineDelete>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
