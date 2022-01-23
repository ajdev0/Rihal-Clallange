import React, { useContext, useState } from "react";
import { ClassContext } from "../../../context/classesContext";

const EditClass = ({ classe }) => {
  const id = classe._id;

  const { editClass, error } = useContext(ClassContext);

  const [name, setName] = useState(classe.name);

  const updatedClass = { name };

  const handleSubmit = (e) => {
    e.preventDefault();
    editClass(id, updatedClass);
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
            placeholder="Enter Class Name"
            required
            value={name}
          />
          <span className="form-bar"></span>
          <label className="float-label">Class Name</label>
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
          Edit Class
        </button>
      </form>
    </div>
  );
};

export default EditClass;
