import React, { useEffect } from "react";
import "./AllUsers.css";
import useUserCollection from "../../../../Hooks/useUserCollection";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPen, BsPlusLg } from "react-icons/bs";
import avatar from "../../../../assets/images/avatar.svg";

function AllUsers() {
  const { getAlluser, userdata } = useUserCollection();
  useEffect(() => {
    getAlluser();
  }, []);
  return (
    <div>
      <div className="users">
        <div className="section_title">
          <h1>Users</h1>
           <button
          className="add_timesheet btn"
        >
          <BsPlusLg className="add_btn" />
          Add User
        </button>
        </div>
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
                  contact number
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
                        <div className="table-data">
                          <AiOutlineDelete
                            className="proj_fun_icons"
                          ></AiOutlineDelete>
                          <BsPen
                            className="proj_fun_icons"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
