import React from "react";

const Countries = () => {
  return (
    <>
      <div className="main-body">
        <div className="page-wrapper">
          <div className="page-body">
            <div classNameName=" col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4>Add Country</h4>
                </div>
                <div className="card-block">
                  <form className="form-material">
                    <div className="form-group form-default form-static-label row">
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="footer-email"
                          className="form-control"
                          placeholder="Enter Country Name"
                          required=""
                        />
                        <span className="form-bar"></span>
                        <label className="float-label">Country</label>
                      </div>
                      <div className="col-sm-4">
                        <input
                          type="text"
                          name="footer-email"
                          className="form-control"
                          placeholder="Enter Country Code"
                          required=""
                        />
                        <span className="form-bar"></span>
                        <label className="float-label">Country Code</label>
                      </div>
                    </div>

                    <button className="btn waves-effect waves-light hor-grd btn-grd-primary ">
                      Add Country
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h4>Countries</h4>
              </div>
              <div className="card-block table-border-style">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Country</th>
                        <th>Code</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>
                          <button className="btn btn-success waves-effect waves-light">
                            Edit
                          </button>

                          <button className="ml-4 btn btn-danger waves-effect waves-light ">
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Countries;
