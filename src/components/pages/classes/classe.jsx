import React, { useContext, useEffect, useState } from "react";
import EditClass from "./editClass";
import { Modal, Button } from "react-bootstrap";
import { ClassContext } from "../../../context/classesContext";
const Classe = ({ classe }) => {
  //
  const { deleteClass } = useContext(ClassContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <td>{classe.name}</td>

      <td>
        <button
          onClick={handleShow}
          className="btn btn-success waves-effect waves-light"
        >
          Edit
        </button>

        <button
          onClick={() => deleteClass(classe._id)}
          className="ml-4 btn btn-danger waves-effect waves-light "
        >
          Delete
        </button>
      </td>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditClass classe={classe} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Classe;
