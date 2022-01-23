import React, { useContext, useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { ClassContext } from "../../../context/classesContext";
import { StudentContext } from "../../../context/studentContext";
import { CountryContext } from "../../../context/countriesContext";
import Pagination from "../../common/pagination";
import AddStudent from "./addStudent";
import Student from "./student";
import Loading from "../../common/loading";

const StudentsList = () => {
  const { students } = useContext(StudentContext);
  const { classes } = useContext(ClassContext);
  const { countries } = useContext(CountryContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);

  //Pagination
  const indexOfLastStd = currentPage * studentsPerPage;
  const indexOfFirstStd = indexOfLastStd - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStd, indexOfLastStd);
  const totalPageNum = Math.ceil(students.length / studentsPerPage);
  useEffect(() => {
    handleClose();
    return () => {};
  }, [students]);
  return (
    <>
      <div className="main-body">
        <div className="page-wrapper">
          <div className="page-body">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col">
                    <h4>Students</h4>
                  </div>
                  <div className="col text-right">
                    <div className="">
                      <button onClick={handleShow} className="btn btn-success">
                        Add Student
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-block table-border-style">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Class</th>
                        <th>Country</th>
                        <th>Age</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStudents.map((student) => {
                        return (
                          <tr key={student._id}>
                            <Student
                              student={student}
                              classes={classes}
                              countries={countries}
                            />
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {totalPageNum === 1 ? (
                    ""
                  ) : (
                    <Pagination
                      pages={totalPageNum}
                      setCurrentPage={setCurrentPage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddStudent classes={classes} countries={countries} />
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

export default StudentsList;
