import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { StudentContext } from "../../../context/studentContext";
import Loading from "../../common/loading";
import EditStudent from "./editStudent";

const Student = ({ student, classes, countries }) => {
  const { deleteStudent } = useContext(StudentContext);

  let clsName = classes.find(function (classe, index) {
    if (classe._id == student.classeId) return classe.name;
  });

  // console.log(clsName.name);

  let countryName = countries.find(function (country, index) {
    if (country._id == student.countryId) return country.name;
  });
  // console.log(countryName);

  const [show, setShow] = useState(false);
  //const [age, setAge] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function getYears(x) {
    return Math.floor(x / 1000 / 60 / 60 / 24 / 365);
  }
  let newDate = new Date();
  let dob = new Date(student.dateOfBirth);
  let age = getYears(newDate - dob);

  return (
    <>
      <td>{student.name}</td>
      <td>{clsName ? clsName.name : <Loading />}</td>
      <td>{countryName ? countryName.name : <Loading />}</td>
      <td>{age}</td>

      <td>
        <button
          onClick={handleShow}
          className="btn btn-success waves-effect waves-light"
        >
          Edit
        </button>

        <button
          onClick={() => deleteStudent(student._id)}
          className="ml-4 btn btn-danger waves-effect waves-light "
        >
          Delete
        </button>
      </td>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditStudent student={student} />
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

export default Student;
