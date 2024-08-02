import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteAllModal({ id }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const localTasks = JSON.parse(localStorage.getItem("localTasks"));
    if (localTasks) {
      setTasks(localTasks);
    }
  }, []);

  const handleDeleteAll = async () => {
    try {
      setTasks([]);
      localStorage.removeItem("localTasks");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleShow} className="c-btn c-btn-icon c-btn--danger">
        <span className="material-symbols-outlined">delete</span>
        <p>Delete all</p>
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
