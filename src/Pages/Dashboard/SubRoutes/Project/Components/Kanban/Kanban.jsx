import React, { useEffect, useState } from "react";
import "./Kanban.css";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import KanbanCard from "../KanbanCard/KanbanCard";
import useTask from "../../../../../../Hooks/useTask";
import { useSelector } from "react-redux";
import { toast} from "react-toastify";
import useProgresProvider from "../../../../../../Hooks/useProgressProvider";
import useProject from "../../../../../../Hooks/useProject";
import { setProjectData } from "../../../../../../Pages/redux/projectDataSlice";
import { useDispatch } from "react-redux";

export default function Kanban({ data }) {
  const dispatch = useDispatch();
  const { projectData } = useSelector((state) => state.projectdatareducer);
  const [showClosed, setShowClosed] = useState(false);
  const { userData } = useSelector((state) => state.logindataslice);
  const [pending, setPending] = useState([]);
  const [running, setRunning] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [closed, setClosed] = useState([]);
  const { updatetaskstatus } = useTask();
  const { calculateProgress } = useProgresProvider();
  const { updateProject } = useProject();

  useEffect(() => {
    console.log(data);
    data?.task?.forEach((each) => {
      switch (each.status.toLowerCase()) {
        case "pending":
          setPending((prev) => [...prev, each]);
          break;
        case "running":
          setRunning((prev) => [...prev, each]);
          break;
        case "completed":
          setCompleted((prev) => [...prev, each]);
          break;
        case "closed":
          setClosed((prev) => [...prev, each]);
          break;
      }
    });
    return () => {
      setPending([]);
      setClosed([]);
      setCompleted([]);
      setRunning([]);
    };
  }, [data]);

  useEffect(() => {
    console.log(pending);
  }, [pending]);

  useEffect(() => {
    let progress = calculateProgress([
      ...pending,
      ...running,
      ...completed,
      ...closed,
    ]);
    if (!isNaN(progress)) {
      updateProject({ progress }, data._id);
      // console.log(projectData);
      let newProjectData = projectData.map((each) => {
        if (each._id == data._id) {
          return { ...each, progress };
        } else {
          return { ...each };
        }
      });
      // console.log(newProjectData);
      dispatch(setProjectData(newProjectData));
    }
  }, [pending, running, completed, closed]);

  const hideClosed = {
    gridTemplateRows: `6fr 0.3fr`,
    gridTemplateColumns: `1fr 1fr 1fr`,
    gridTemplateAreas: `
        pending running completed
        footer footer footer`,
  };

  const PopFromArray = (arr, index) => {
    let newArr = [...arr];
    newArr.splice(index, 1);
    return newArr;
  };

  const PushIntoArray = (arr, index, doc) => {
    let newArr = [...arr];
    newArr.splice(index, 0, doc);
    return newArr;
  };

  const onDragEnd = ({ source, destination }) => {
    console.log("source ", source);
    console.log("destination ", destination);

    if (
      userData.role_name === "Jr devloper" &&
      destination.droppableId === "closed"
    ) {
      toast.error("you do not allow to close the task !", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (!destination?.droppableId) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let grabbed;

    // if (destination.droppableId !== source.droppableId) {
    switch (source.droppableId) {
      case "pending":
        grabbed = pending[source.index];
        setPending((prev) => PopFromArray(prev, source.index));
        break;
      case "running":
        grabbed = running[source.index];
        setRunning((prev) => PopFromArray(prev, source.index));
        break;
      case "completed":
        grabbed = completed[source.index];
        setCompleted((prev) => PopFromArray(prev, source.index));
        break;
      case "closed":
        grabbed = closed[source.index];
        setClosed((prev) => PopFromArray(prev, source.index));
        break;
    }
    // }
    switch (destination.droppableId) {
      case "pending":
        console.log({ ...grabbed, status: "pending" });
        setPending((prev) =>
          PushIntoArray(prev, destination.index, {
            ...grabbed,
            status: "pending",
          })
        );
        updatetaskstatus({ ...grabbed, status: "pending" });
        break;
      case "running":
        console.log({ ...grabbed, status: "running" });
        setRunning((prev) =>
          PushIntoArray(prev, destination.index, {
            ...grabbed,
            status: "running",
          })
        );
        updatetaskstatus({ ...grabbed, status: "running" });
        break;
      case "completed":
        console.log({ ...grabbed, status: "completed" });
        setCompleted((prev) =>
          PushIntoArray(prev, destination.index, {
            ...grabbed,
            status: "completed",
          })
        );
        updatetaskstatus({ ...grabbed, status: "completed" });
        break;
      case "closed":
        console.log({ ...grabbed, status: "closed" });
        setClosed((prev) =>
          PushIntoArray(prev, destination.index, {
            ...grabbed,
            status: "closed",
          })
        );
        updatetaskstatus({ ...grabbed, status: "closed" });
        break;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban" style={showClosed ? {} : hideClosed}>
        <div className="pending column">
          <p className="col_name">Pending</p>
          <Droppable droppableId="pending">
            {(provided) => {
              return (
                <div
                  className="card_holder"
                  id="style-1"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {pending?.map((each, index) => {
                    return (
                      <KanbanCard each={each} key={each._id} index={index} />
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
        <div className="running column">
          <p className="col_name">Running</p>
          <Droppable droppableId="running">
            {(provided) => {
              return (
                <div
                  className="card_holder"
                  id="style-1"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {running?.map((each, index) => {
                    return (
                      <KanbanCard each={each} key={each._id} index={index} />
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
        <div className="completed column">
          <p className="col_name">Completed</p>
          <Droppable droppableId="completed">
            {(provided) => {
              return (
                <div
                  className="card_holder"
                  id="style-1"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {completed?.map((each, index) => {
                    return (
                      <KanbanCard each={each} key={each._id} index={index} />
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
        <div
          className="kanban_footer"
          onClick={() => {
            setShowClosed((prev) => !prev);
          }}
        >
          <p>{showClosed ? "Hide Closed" : "Show Closed"}</p>
          {!showClosed && <MdOutlineKeyboardArrowUp className="footer_icon" />}
          {showClosed && <MdOutlineKeyboardArrowDown className="footer_icon" />}
        </div>

        {showClosed && (
          <div className="closed column">
            <p className="col_name">Closed</p>
            <Droppable
              droppableId="closed"
              direction="horizontal"
              isDropDisabled={userData.role_name === "Jr devloper"}
            >
              {(provided) => {
                return (
                  <div
                    className="card_holder horizontal_card_holder"
                    id="style-1"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {closed?.map((each, index) => {
                      return (
                        <KanbanCard each={each} key={each._id} index={index} />
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>
        )}
      </div>
    </DragDropContext>
  );
}
