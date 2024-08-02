import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const localTasks = JSON.parse(localStorage.getItem("localTasks"));
    if (localTasks) {
      setTasks(localTasks);
    }
  }, []);

  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      if (sortCriteria === "name") {
        if (sortOrder === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      } else if (sortCriteria === "date") {
        if (sortOrder === "asc") {
          return new Date(a.due_date) - new Date(b.due_date);
        } else {
          return new Date(b.due_date) - new Date(a.due_date);
        }
      } else if (sortCriteria === "id") {
        if (sortOrder === "asc") {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      }
      return tasks;
    });
  };

  return (
    <div className="">
      <div className="task--cont">
        <h5>To dos</h5>
        <div className="filters--cont">
          <label htmlFor="sort">Sort by: </label>
          <div className="sort-order">
            <div className="sort">
              <div className="select--cont">
                <select
                  id="sort"
                  value={sortCriteria}
                  onChange={(e) => setSortCriteria(e.target.value)}
                >
                  <option value="name">Name</option>
                  <option value="date">Due Date</option>
                  <option value="id">ID</option>
                </select>
                <div className="select_arrow"></div>
              </div>
            </div>
            <div className="order">
              <button
                className="btn--order"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                {sortOrder === "asc" ? (
                  <span className="material-symbols-outlined">
                    arrow_downward
                  </span>
                ) : (
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="tasks--cont">
          <div className="list--cont">
            <h6>Active</h6>
            <div className="task-card-list">
              {tasks.filter((task) => task.is_completed === 0).length === 0 ? (
                <p className="message">No on-going tasks.</p>
              ) : (
                sortTasks(tasks.filter((task) => task.is_completed === 0)).map(
                  (task) => <TaskCard key={task.id} task={task} />
                )
              )}
            </div>
          </div>
          <div className="list--cont">
            <h6>Completed</h6>
            <div className="task-card-list">
              {tasks
                .filter((task) => task.is_completed === 1)
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
