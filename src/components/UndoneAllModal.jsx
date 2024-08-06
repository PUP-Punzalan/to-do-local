import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { doneAllTasks, getTasks, undoneAllTask } from "../functions/functions";
import { TaskContext } from "../pages/Tasks";

function UndoneAllModal() {
  const { toggleUpdateFlag } = useContext(TaskContext);
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
    const localTasks = getTasks();
    if (localTasks) {
      setTasks(localTasks);
    }
  }, []);

  const handleUndoneAll = () => {
    undoneAllTask();
    handleClose();
    toggleUpdateFlag();
  };

  return (
    <>
      <button onClick={handleShow} className="c-btn c-btn-icon c-btn--primary">
        <span className="material-symbols-outlined">cached</span>
        <p className="c-btn-label">Undone all tasks</p>
      </button>

      <Modal className="modal-anim" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Undone confimation</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to mark as undone all the tasks?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="c-btn--primary"
            onClick={handleUndoneAll}
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

export default UndoneAllModal;
