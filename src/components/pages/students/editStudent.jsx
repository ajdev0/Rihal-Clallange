import React, { useContext, useState } from "react";
import { StudentContext } from "../../../context/studentContext";
import { ClassContext } from "../../../context/classesContext";
import { CountryContext } from "../../../context/countriesContext";

const EditStudent = ({ student }) => {
  const id = student._id;

  const { editStudent, error } = useContext(StudentContext);
  const { classes } = useContext(ClassContext);
  const { countries } = useContext(CountryContext);

  const [name, setName] = useState(student.name);
  const [classeId, setClass] = useState(student.classeId);
  const [countryId, setCountry] = useState(student.countryId);
  const [dateOfBirth, setDateOfBirth] = useState(student.dateOfBirth);

  let dob = new Date(dateOfBirth).toISOString().split("T")[0];
  let clsName = classes.find(async function (classe, index) {
    if (classe._id == student.classeId) return await classe.name;
  });
  let countryName = countries.find(async function (country, index) {
    if (country._id == student.countryId) return await country.name;
  });

  const updatedStudent = { name, classeId, countryId, dateOfBirth };

  const handleSubmit = (e) => {
    e.preventDefault();
    editStudent(id, updatedStudent);
  };
  return (
    <div className="card-block">
      <form className="form-material" onSubmit={handleSubmit}>
        <div className="form-group form-default form-static-label">
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="form-control"
            placeholder="Enter Student Name"
            required
            value={name}
          />
          <span className="form-bar"></span>
          <label className="float-label">Student Name</label>
        </div>
        <div className="mt-5 form-group form-default form-static-label">
          <select
            name="classeId"
            onChange={(e) => {
              setClass(e.target.value);
            }}
            className="form-control"
          >
            <option value>{clsName.name}</option>
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
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            className="form-control"
            required
          >
            <option value={countryId}>{countryName.name}</option>
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
            onChange={(e) => {
              setDateOfBirth(e.target.value);
            }}
            value={dob}
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
          className="btn waves-effect waves-light hor-grd btn-grd-primary "
        >
          Edit Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
