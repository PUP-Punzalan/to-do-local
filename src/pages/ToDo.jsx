import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getCurrentDate } from "../utils/FormatDate";

const ToDo = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    is_completed: 0,
    due_date: "",
    created_at: getCurrentDate(),
  });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const localTasks = JSON.parse(localStorage.getItem("localTasks"));
    if (localTasks) {
      setTasks(localTasks);
    }
  }, []);

  const handleChange = (e) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = () => {
    if (task) {
      const newTask = {
        id: tasks.length + 1,
        title: task.title,
        description: task.description,
        is_completed: task.is_completed,
        due_date: task.due_date,
        created_at: task.created_at,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
      setTask(""); // Clear input after adding
    }
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
  };

  const handleClear = () => {
    setTasks([]);
    localStorage.removeItem("localTasks");
  };

  return (
    <div>
      <div className="task--cont">
        <h5>To dos</h5>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={task.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Enter description"
          value={task.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="due_date"
          placeholder="Enter due_date"
          value={task.due_date}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add task</button>
        <button onClick={handleClear}>Clear tasks</button>

        <h5>You have {tasks.length} tasks</h5>

        <div>
          {tasks.map((t) => (
            <div key={t.id}>
              <h5>{t.title}</h5>
              <p>{t.description}</p>
              <p>{t.due_date}</p>
              <p>{t.created_at}</p>
              <button>Done</button>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
