import React, { useContext, useState } from "react";
import { ClassContext } from "../../../context/classesContext";

const AddClasse = () => {
  const { addClass, error } = useContext(ClassContext);

  const [classe, setClasse] = useState({ name: "" });
  const handleChange = (e) => {
    setClasse({ ...classe, [e.target.name]: e.target.value });
  };
  const { name } = classe;
  const handleSubmit = (e) => {
    e.preventDefault();
    addClass(name);
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
                  placeholder="Enter Class Name"
                  required
                  onChange={(e) => handleChange(e)}
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
                Add Class
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClasse;
