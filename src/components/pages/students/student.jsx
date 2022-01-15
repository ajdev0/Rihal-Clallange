import React from "react";

const Student = () => {
  return (
    <>
      <div className="main-body">
        <div className="page-wrapper">
          <div className="page-body">
            <div classNameName=" col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4>Add Student</h4>
                </div>
                <div className="card-block">
                  <form className="form-material">
                    <div className="form-group form-default form-static-label row">
                      <div className="col-sm-6">
                        <input
                          type="text"
                          name="footer-email"
                          className="form-control"
                          placeholder="Enter Student Name"
                          required=""
                        />
                        <span className="form-bar"></span>
                        <label className="float-label">Student</label>
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="date"
                          name="footer-email"
                          className="form-control"
                          placeholder="Enter Student Age"
                          required=""
                        />
                        <span className="form-bar"></span>
                        <label className="float-label">Student age</label>
                      </div>
                    </div>
                    <div className="form-group form-default form-static-label row">
                      <div className="col-sm-6">
                        <select class="form-control">
                          <option>Default select</option>
                        </select>
                        <span className="form-bar"></span>
                        <label className="float-label">Student Class</label>
                      </div>
                      <div className="col-sm-6">
                        <select class="form-control">
                          <option>Default select</option>
                        </select>
                        <span className="form-bar"></span>
                        <label className="float-label">Student Country</label>
                      </div>
                    </div>

                    <button className="btn waves-effect waves-light hor-grd btn-grd-primary ">
                      Add Student
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h4>Students</h4>
              </div>
              <div className="card-block table-border-style">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Student</th>
                        <th>Class</th>
                        <th>Country</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
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

export default Student;
