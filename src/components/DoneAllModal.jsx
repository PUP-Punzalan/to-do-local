import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DoneAllModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [task, setTask] = useState({
    title: "",
    description: "",
    is_completed: 0,
    due_date: "",
    created_at: "",
  });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const localTasks = JSON.parse(localStorage.getItem("localTasks"));
    if (localTasks) {
      setTasks(localTasks);
    }
  }, []);

  const handleDoneAll = () => {
    const updatedTasks = tasks.map((task) => ({
      ...task,
      is_completed: 1, // Assuming 1 represents completed
    }));
    setTasks(updatedTasks);
    localStorage.setItem("localTasks", JSON.stringify(updatedTasks));
    handleClose();
    window.location.reload(); // Optional: reload to reflect changes
  };

  return (
    <>
      <button onClick={handleShow} className="c-btn c-btn-icon c-btn--suceess">
        <span className="material-symbols-outlined">check</span>
        <p>Done all</p>
      </button>

      <Modal className="modal-anim" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Done confimation</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to mark as done all the tasks?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="c-btn--primary"
            onClick={handleDoneAll}
          >
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DoneAllModal;
