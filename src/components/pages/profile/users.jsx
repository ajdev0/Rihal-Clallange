import React from "react";

const Users = () => {
  return (
    <>
      <div className="main-body">
        <div className="page-wrapper">
          <div className="page-body">
            <div classNameName=" col-md-6">
              <div className="card">
                <div className="card-header">
                  <h4>Add User</h4>
                </div>
                <div className="card-block">
                  <form className="form-material">
                    <div className="form-group form-default form-static-label row">
                      <div className="col-sm-4">
                        <input
                          type="text"
                          name="footer-email"
                          className="form-control"
                          placeholder="Enter User Name"
                          required=""
                        />
                        <span className="form-bar"></span>
                        <label className="float-label">User Name</label>
                      </div>
                      <div className="col-sm-4">
                        <input
                          type="email"
                          name="footer-email"
                          className="form-control"
                          placeholder="Enter User Email"
                          required=""
                        />
                        <span className="form-bar"></span>
                        <label className="float-label">User Email</label>
                      </div>
                      <div className="col-sm-4">
                        <input
                          type="password"
                          name="footer-email"
                          className="form-control"
                          placeholder="Enter User Password"
                          required=""
                        />
                        <span className="form-bar"></span>
                        <label className="float-label">User Password</label>
                      </div>
                    </div>

                    <button className="btn waves-effect waves-light hor-grd btn-grd-primary ">
                      Add User
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h4>Users</h4>
              </div>
              <div className="card-block table-border-style">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>User</th>

                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>

                        <td>
                          <button className="btn btn-success waves-effect waves-light">
                            Edit
                          </button>

                          <button className="ml-4 btn btn-danger waves-effect waves-light ">
                            Delete
                          </button>
                          <button className="ml-4 btn btn-warning waves-effect waves-light ">
                            Make Admin
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

export default Users;
