import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteAllTasks, getTasks } from "../functions/functions";
import { TaskContext } from "../pages/Tasks";

function DeleteAllModal({ id }) {
  const { toggleUpdateFlag } = useContext(TaskContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const localTasks = getTasks();
    if (localTasks) {
      setTasks(localTasks);
    }
  }, []);

  const handleDeleteAll = async () => {
    deleteAllTasks();
    handleClose();
    toggleUpdateFlag();
  };

  return (
    <>
      <button onClick={handleShow} className="c-btn c-btn-icon c-btn--primary">
        <span className="material-symbols-outlined">delete</span>
        <p className="c-btn-label">Delete all</p>
      </button>

      <Modal className="modal-anim" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Delete confimation</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete all the tasks?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="c-btn--primary"
            onClick={handleDeleteAll}
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

export default DeleteAllModal;
