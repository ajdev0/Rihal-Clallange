import React, { useContext, useEffect, useState } from "react";
import { StudentContext } from "../../context/studentContext";

const AllStudents = () => {
  const { stdAvgAges } = useContext(StudentContext);
  const [avg, setAvg] = useState([]);
  async function getStdAvgAges() {
    const avg = await stdAvgAges();

    setAvg(avg);
  }

  useEffect(() => {
    getStdAvgAges();
  }, []);
  return (
    <div className="col-xl-8 col-md-12">
      <div className="card">
        <div className="card-block">
          <h3>Students Average Ages</h3>
          <div className="row align-items-center">
            <div className="col-8">
              <div className="row mt-5">
                <div className="col">
                  <h5 className="text-muted m-b-0">Students Average Ages </h5>
                </div>
                <div className="col">
                  <h4 className="text-c-blue">{avg}</h4>
                </div>
              </div>
            </div>
            <div className="col-4 text-right">
              <i className="fa fa-bar-chart f-28"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStudents;
