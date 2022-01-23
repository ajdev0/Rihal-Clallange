import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { CountryContext } from "../../../context/countriesContext";
import Pagination from "../../common/pagination";
import Country from "./country";
import AddCountry from "./addCountry";
const CountriesList = () => {
  const { countries } = useContext(CountryContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(25);

  //Pagination
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
  const totalPageNum = Math.ceil(countries.length / countriesPerPage);
  useEffect(() => {
    handleClose();
    return () => {};
  }, [countries]);
  return (
    <>
      <div className="main-body">
        <div className="page-wrapper">
          <div className="page-body">
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col">
                    <h4>Countries</h4>
                  </div>
                  <div className="col text-right">
                    <div className="">
                      <button onClick={handleShow} className="btn btn-success">
                        Add Country
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
                        <th>Country</th>
                        <th>Code</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCountries.map((country) => {
                        return (
                          <tr key={country._id}>
                            <Country country={country} />
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
          <AddCountry />
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
export default CountriesList;
