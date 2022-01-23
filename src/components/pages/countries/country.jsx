import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { CountryContext } from "../../../context/countriesContext";
import EditCountry from "./editCountry";

const Country = ({ country }) => {
  //
  const { deleteCountry } = useContext(CountryContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <td key={country._id}>{country.name}</td>
      <td>{country.code}</td>

      <td>
        <button
          onClick={handleShow}
          className="btn btn-success waves-effect waves-light"
        >
          Edit
        </button>

        <button
          onClick={() => deleteCountry(country._id)}
          className="ml-4 btn btn-danger waves-effect waves-light "
        >
          Delete
        </button>
      </td>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Country</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditCountry country={country} />
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

export default Country;
