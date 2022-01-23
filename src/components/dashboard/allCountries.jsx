import React, { useContext, useState, useEffect } from "react";
import { CountryContext } from "../../context/countriesContext";
import { StudentContext } from "../../context/studentContext";
import Pagination from "../common/pagination";
import Country from "./country";

const AllCountries = () => {
  const { countries } = useContext(CountryContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(15);

  //Pagination
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
  const totalPageNum = Math.ceil(countries.length / countriesPerPage);

  return (
    <div className="col-xl-8 col-md-12">
      <div className="card table-card">
        <div className="card-header">
          <h5>Classes</h5>
          <div className="card-header-right">
            <ul className="list-unstyled card-option">
              <li>
                <i className="fa fa fa-wrench open-card-option"></i>
              </li>
              <li>
                <i className="fa fa-window-maximize full-card"></i>
              </li>
              <li>
                <i className="fa fa-minus minimize-card"></i>
              </li>
              <li>
                <i className="fa fa-refresh reload-card"></i>
              </li>
              <li>
                <i className="fa fa-trash close-card"></i>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-block">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Students Number</th>
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
  );
};

export default AllCountries;
