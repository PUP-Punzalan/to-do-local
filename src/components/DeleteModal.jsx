import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteTask, getTasks } from "../functions/functions";
import { TaskContext } from "../pages/Tasks";

function DeleteModal({ id }) {
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

  const handleDelete = async () => {
    try {
      deleteTask(id);
      toggleUpdateFlag();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleShow} className="c-btn--danger">
        <span className="material-symbols-outlined">delete</span>
      </button>

      <Modal className="modal-anim" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Delete confimation</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="c-btn--primary"
            onClick={handleDelete}
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

export default DeleteModal;
