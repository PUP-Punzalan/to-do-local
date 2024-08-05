import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { formatYYYYMMDD, getCurrentDate } from "../utils/FormatDate";
import { addTask, getTasks } from "../functions/functions";
import { TaskContext } from "../pages/Tasks";

function AddModal() {
  const { toggleUpdateFlag } = useContext(TaskContext);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const [task, setTask] = useState({
    title: "",
    description: "",
    is_completed: 0,
    due_date: "",
    created_at: getCurrentDate(),
  });
  const [tasks, setTasks] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const localTasks = getTasks();
    if (localTasks) {
      setTasks(localTasks);
    }
  }, []);

  const handleChange = (e) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (e) => {
    setTask((prev) => ({ ...prev, due_date: formatYYYYMMDD(e.target.value) }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // Validation check
    if (!task.title || !task.description || !task.due_date) {
      setError("All fields must be filled out.");
      return;
    }

    try {
      const newTask = {
        id: tasks.length + 1,
        title: task.title,
        description: task.description,
        is_completed: task.is_completed,
        due_date: task.due_date,
        created_at: task.created_at,
      };
      addTask(newTask);

      setTask(""); // Clear input fields
      setError(""); // Clear error
      handleClose();
      toggleUpdateFlag(); // Update the task list
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleShow} className="c-btn c-btn-icon c-btn--primary">
        <span className="material-symbols-outlined">add</span>
        <p className="c-btn-label">Add new task</p>
      </button>

      <Modal className="modal-anim" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Add new task</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <p style={{ color: "red", marginBottom: "16px" }}>{error}</p>
          )}{" "}
          <div className="input--field">
            <label htmlFor="title">Title</label>
            <input
              required
              type="text"
              name="title"
              placeholder="Enter title"
              onChange={handleChange}
              value={task.title}
            />
          </div>
          <div className="input--field">
            <label htmlFor="due_date">Due Date</label>
            <input
              required
              type="date"
              name="due_date"
              placeholder="Due Date"
              onChange={handleDateChange}
              value={task.due_date}
            />
          </div>
          <div className="input--field">
            <label htmlFor="description">Description</label>
            <textarea
              required
              name="description"
              placeholder="Description"
              onChange={handleChange}
              value={task.description}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="c-btn--primary"
            onClick={handleClick}
          >
            Add task
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              setError(""); // Clear error on cancel
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddModal;
