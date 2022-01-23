import React, { useContext, useState } from "react";
import { CountryContext } from "../../../context/countriesContext";

const AddCountry = () => {
  const { addCountry, error } = useContext(CountryContext);

  const [country, setCountry] = useState({ name: "", code: "" });
  const handleChange = (e) => {
    setCountry({ ...country, [e.target.name]: e.target.value });
  };
  const { name, code } = country;
  const handleSubmit = (e) => {
    e.preventDefault();
    addCountry(name, code);
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
                  onChange={(e) => handleChange(e)}
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
                  onChange={(e) => handleChange(e)}
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
                Add Country
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddCountry;
