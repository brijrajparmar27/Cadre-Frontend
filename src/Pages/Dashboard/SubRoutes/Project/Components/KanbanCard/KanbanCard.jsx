import React from "react";
import { Draggable } from "react-beautiful-dnd";
import avatar from "../../../../../../assets/images/avatar.svg";
import "./KanbanCard.css";

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
            <h3 className="title">{each.title}</h3>
            <p className="description">
              {each?.description?.substring(0, 100)}
              {each?.description?.length > 100 && (
                <span className="view-more">...</span>
              )}
            </p>
            <div className="assigned">
              {each?.assigned?.map((each, index) => {
                return (
                  index < 4 && (
                    <a href="#" className="avatars__item" key={each._id}>
                      <img className="avatar" src={each.img || avatar} alt="" />
                    </a>
                  )
                );
              })}

              {each?.assigned?.length > 4 && (
                <a href="#" className="avatars__item">
                  <p>+{each.assigned.length - 4}</p>
                </a>
              )}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
