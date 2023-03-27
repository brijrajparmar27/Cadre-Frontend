import React from "react";
import { Draggable } from "react-beautiful-dnd";
import avatar from "../../../../../../assets/images/avatar.svg";
import "./KanbanCard.css";
import { FcHighPriority } from "react-icons/fc";
import { Fragment } from "react";

export default function KanbanCard({ each, index }) {
  return (
    <Draggable draggableId={`${each._id}`} index={parseInt(index)}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            className={snapshot.isDragging ? "kanbancard lifted" : "kanbancard"}
          >
            <h3 className="title">
              {each?.title?.substring(0, 54)}
              {each?.title?.length > 54 && (
                <span className="view-more">...</span>
              )}
            </h3>
            <p className="description">
              {each?.description?.substring(0, 100)}
              {each?.description?.length > 100 && (
                <span className="view-more">...</span>
              )}
            </p>
            <div className="assigned">
              <div className="avatars">
                {each?.assigned?.map((each, index) => {
                  return (
                    <Fragment key={each._id}>
                      {index < 4 && (
                        <div className="avatars__item_contain">
                          <p className="whoami">{each.name}</p>
                          <a href="#" className="avatars__item">
                            <img
                              className="avatar"
                              src={
                                each.img
                                  ? `${import.meta.env.VITE_SERVER}${each.img}`
                                  : avatar
                              }
                              alt=""
                            />
                          </a>
                        </div>
                      )}
                    </Fragment>
                  );
                })}

                {each?.assigned?.length > 4 && (
                  <a href="#" className="avatars__item">
                    <p>+{each.assigned.length - 4}</p>
                  </a>
                )}
              </div>
              {each.priority && (
                <div className="task_priority">
                  <FcHighPriority />
                </div>
              )}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
