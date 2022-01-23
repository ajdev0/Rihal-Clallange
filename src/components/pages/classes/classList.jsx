import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ClassContext } from "../../../context/classesContext";
import Pagination from "../../common/pagination";
import AddClasse from "./addClass";
import Classe from "./classe";

const ClassList = () => {
  const { classes } = useContext(ClassContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [classesPerPage] = useState(5);

  //Pagination
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = classes.slice(indexOfFirstClass, indexOfLastClass);
  const totalPageNum = Math.ceil(classes.length / classesPerPage);
  useEffect(() => {
    handleClose();
    return () => {};
  }, [classes]);
  return (
    <>
      <div className="main-body">
        <div className="page-wrapper">
          <div className="page-body">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col">
                    <h4>Classes</h4>
                  </div>
                  <div className="col text-right">
                    <div className="">
                      <button onClick={handleShow} className="btn btn-success">
                        Add Class
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
                        <th>Class</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentClasses.map((classe) => {
                        return (
                          <tr key={classe._id}>
                            <Classe classe={classe} />
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
          <Modal.Title>Add Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddClasse />
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

export default ClassList;
