import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClassContext } from "../../context/classesContext";
import Classe from "./classe";

const AllClasses = () => {
  const { classes } = useContext(ClassContext);

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
                {classes.map((classe) => {
                  return (
                    <tr key={classe._id}>
                      <Classe classe={classe} />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClasses;
