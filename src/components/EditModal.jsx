import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { formatYYYYMMDD } from "../utils/FormatDate";
import { editTask, getTasks } from "../functions/functions";
import { TaskContext } from "../pages/Tasks";

function EditModal({ taskId }) {
  const { toggleUpdateFlag } = useContext(TaskContext);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const [task, setTask] = useState({
    title: "",
    description: "",
    is_completed: 0,
    due_date: "",
    created_at: "",
  });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const localTasks = getTasks();
    if (localTasks) {
      setTasks(localTasks);
      const taskToEdit = localTasks.find((task) => task.id === taskId);
      if (taskToEdit) {
        setTask(taskToEdit);
      }
    }
  }, [taskId]);

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (type === "checkbox") {
      setTask((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
    } else {
      setTask((prev) => ({ ...prev, [name]: value }));
    }
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
      editTask(task);
      handleClose();
      toggleUpdateFlag(); // Update the task list
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleShow} className="c-btn--primary">
        <span className="material-symbols-outlined">edit</span>
      </button>

      <Modal className="modal-anim" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Edit task {task && task.id}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <p style={{ color: "red", marginBottom: "16px" }}>{error}</p>
          )}{" "}
          {/* Display error message */}
          {task ? (
            <>
              <div className="input--field">
                <label htmlFor="title">Title</label>
                <input
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
                  type="date"
                  name="due_date"
                  placeholder="Due Date"
                  onChange={handleDateChange}
                  value={task.due_date}
                />
              </div>
              <div className="input--field">
                <label htmlFor="due_time">Due Time</label>
                <input
                  type="time"
                  name="due_time"
                  placeholder="Due Date"
                  onChange={handleChange}
                  value={task.due_time}
                />
              </div>
              <div className="input--field">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  placeholder="Description"
                  onChange={handleChange}
                  value={task.description}
                />
              </div>
            </>
          ) : (
            <p>Loading task data...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="c-btn--primary"
            variant="primary"
            onClick={handleClick}
          >
            Save changes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
