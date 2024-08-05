import PropTypes from "prop-types";
import { formatMMMMDDYYYY, getDayWord } from "../utils/FormatDate";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { useContext, useEffect, useState } from "react";
import { doneTask, getTasks } from "../functions/functions";
import { TaskContext } from "../pages/Tasks";

const TaskCard = ({ task }) => {
  const { toggleUpdateFlag } = useContext(TaskContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const localTasks = getTasks();
    if (localTasks) {
      setTasks(localTasks);
    }
  }, []);

  const handleComplete = (id) => {
    doneTask(id);
    toggleUpdateFlag();
  };

  return (
    <div className="task-card--cont">
      <div className="side">
        <div className="inside">
          <div className="title">
            <h6
              className="c-title"
              style={{
                textDecoration:
                  task.is_completed === 1 ? "line-through" : "none",
                color: task.is_completed === 1 ? "gray" : "black",
              }}
            >
              {task.title}
            </h6>
            <div className="checkbox-wrapper-12">
              <div className="cbx">
                <input
                  id="cbx-12"
                  type="checkbox"
                  checked={task.is_completed === 1}
                  onChange={() => handleComplete(task.id)}
                />
                <label htmlFor="cbx-12"></label>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="goo-12">
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="4"
                      result="blur"
                    ></feGaussianBlur>
                    <feColorMatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                      result="goo-12"
                    ></feColorMatrix>
                    <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
          <div className="due-date">
            <span className="material-symbols-outlined c-icon-md">
              event_available
            </span>

            <p className="sm">
              {getDayWord(task.due_date)}, {formatMMMMDDYYYY(task.due_date)}
            </p>
          </div>
        </div>
        <div className="side">
          <p className="sm c-description">{task.description}</p>
        </div>
      </div>
      <div className="bottom">
        <p className="xs">{formatMMMMDDYYYY(task.created_at)}</p>
        <div className="actions">
          <EditModal taskId={task.id} />
          <DeleteModal id={task.id} />
        </div>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    is_completed: PropTypes.number.isRequired,
    due_date: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskCard;
