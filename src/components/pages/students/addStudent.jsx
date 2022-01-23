import React, { useContext, useState } from "react";
import { StudentContext } from "../../../context/studentContext";

const AddStudent = ({ classes, countries }) => {
  const { addStudent, error } = useContext(StudentContext);

  const [classe, setClasse] = useState({
    name: "",
    classeId: "",
    countryId: "",
    dateOfBirth: "",
  });
  const handleChange = (e) => {
    setClasse({ ...classe, [e.target.name]: e.target.value });
  };
  const { name, classeId, countryId, dateOfBirth } = classe;
  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(name, classeId, countryId, dateOfBirth);
  };
  return (
    <div>
      <div className=" col-md">
        <div className="card">
          <div className="card-block">
            <form className="form-material" onSubmit={handleSubmit}>
              <div className="form-group form-default form-static-label">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter Student Name"
                  required
                  onChange={(e) => handleChange(e)}
                  value={name}
                />
                <span className="form-bar"></span>
                <label className="float-label">Student Name</label>
              </div>
              <div className="mt-5 form-group form-default form-static-label">
                <select
                  name="classeId"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                >
                  <option>Select Class</option>
                  {classes.map((classe) => {
                    return (
                      <option key={classe._id} value={classe._id}>
                        {classe.name}
                      </option>
                    );
                  })}
                </select>
                <span className="form-bar"></span>
                <label className="float-label">Student Class</label>
              </div>
              <div className="mt-5 form-group form-default form-static-label">
                <select
                  name="countryId"
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                >
                  <option>Select Country</option>
                  {countries.map((country) => {
                    return (
                      <option key={country._id} value={country._id}>
                        {country.name}
                      </option>
                    );
                  })}
                </select>
                <span className="form-bar"></span>
                <label className="float-label">Student Country</label>
              </div>
              <div className="form-group form-default form-static-label">
                <input
                  type="date"
                  name="dateOfBirth"
                  className="form-control"
                  placeholder="Enter Age"
                  required
                  onChange={(e) => handleChange(e)}
                  value={dateOfBirth}
                />
                <span className="form-bar"></span>
                <label className="float-label">Student Name</label>
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="btn mt-5 waves-effect waves-light hor-grd btn-grd-primary "
              >
                Add Student
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddStudent;
