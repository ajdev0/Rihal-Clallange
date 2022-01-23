import React, { useContext, useState } from "react";
import { CountryContext } from "../../../context/countriesContext";

const EditCountry = ({ country }) => {
  const id = country._id;

  const { editCountry, error } = useContext(CountryContext);

  const [name, setName] = useState(country.name);
  const [code, setCode] = useState(country.code);

  const updatedCountry = { name, code };

  const handleSubmit = (e) => {
    e.preventDefault();
    editCountry(id, updatedCountry);
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
                  placeholder=" Country Name"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
                <span className="form-bar"></span>
                <label className="float-label">Country Name</label>
              </div>
              <div className="form-group form-default form-static-label">
                <input
                  type="text"
                  name="code"
                  className="form-control"
                  placeholder=" Country Code"
                  required
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                  value={code}
                />
                <span className="form-bar"></span>
                <label className="float-label">Country Name</label>
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
                Edit Country
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCountry;
