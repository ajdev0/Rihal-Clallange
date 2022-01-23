import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ClassContext } from "../../context/classesContext";
import { CountryContext } from "../../context/countriesContext";
import { StudentContext } from "../../context/studentContext";
import AllClasses from "./allClasses";

const Dashboard = () => {
  const { classes } = useContext(ClassContext);
  const { countries } = useContext(CountryContext);
  const { students } = useContext(StudentContext);

  return (
    <>
      <div class="row mx-auto">
        <div className="col-xl-3 col-md-6">
          <div className="card">
            <Link to="/allClasses">
              <div className="card-block">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h4 className="text-c-purple">
                      {Object.keys(classes).length}
                    </h4>
                    <h6 className="text-muted m-b-0">All Classes</h6>
                  </div>
                  <div className="col-4 text-right">
                    <i className="fa fa-bar-chart f-28"></i>
                  </div>
                </div>
              </div>
            </Link>

            <div className="card-footer bg-c-purple">
              <div className="row align-items-center">
                <div className="col-9">
                  <p className="text-white m-b-0"></p>
                </div>
                <div className="col-3 text-right">
                  <i className="fa fa-line-chart text-white f-16"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card">
            <Link to="/allStudents">
              <div className="card-block">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h4 className="text-c-blue">
                      {Object.keys(students).length}
                    </h4>
                    <h6 className="text-muted m-b-0">All Students</h6>
                  </div>
                  <div className="col-4 text-right">
                    <i className="fa fa-bar-chart f-28"></i>
                  </div>
                </div>
              </div>
            </Link>

            <div className="card-footer bg-c-blue">
              <div className="row align-items-center">
                <div className="col-9">
                  <p className="text-white m-b-0"></p>
                </div>
                <div className="col-3 text-right">
                  <i className="fa fa-line-chart text-white f-16"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card">
            <Link to="/allCountries">
              <div className="card-block">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h4 className="text-c-green">
                      {Object.keys(countries).length}
                    </h4>
                    <h6 className="text-muted m-b-0">All Countries</h6>
                  </div>
                  <div className="col-4 text-right">
                    <i className="fa fa-bar-chart f-28"></i>
                  </div>
                </div>
              </div>
            </Link>

            <div className="card-footer bg-c-green">
              <div className="row align-items-center">
                <div className="col-9">
                  <p className="text-white m-b-0"></p>
                </div>
                <div className="col-3 text-right">
                  <i className="fa fa-line-chart text-white f-16"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
