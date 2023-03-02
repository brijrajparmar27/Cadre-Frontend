import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./KanbanCard.css";

export default function KanbanCard({ each, index }) {
  return (
    <Draggable draggableId={`${each._id}`} index={parseInt(index)}>
      {(provided) => {
        return (
          <div
            className="kanbancard"
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <h1>{each.title}</h1>
          </div>
        );
      }}
    </Draggable>
  );
}
