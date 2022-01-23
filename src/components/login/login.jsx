import React, { useState } from "react";
import http from "../../services/httpService";
import { Link } from "react-router-dom";
import api from "../../config.json";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    await e.preventDefault();
    try {
      const url = `${api.API_URL}api/auth`;
      const { data: res } = await http.post(url, data);

      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="auth">
      <section className="login-block auth">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <form
                className="md-float-material form-material"
                onSubmit={handleSubmit}
              >
                <div className="text-center">Rihal Challange</div>
                <div className="auth-box card">
                  <div className="card-block">
                    <div className="row m-b-20">
                      <div className="col-md-12">
                        <h3 className="text-center">Sign In</h3>
                      </div>
                    </div>
                    <div className="form-group form-primary">
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        required
                        className="form-control"
                      />
                      <span className="form-bar"></span>
                      <label className="float-label">Your Email Address</label>
                    </div>
                    <div className="form-group form-primary">
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={data.password}
                        required
                        className="form-control"
                      />
                      <span className="form-bar"></span>
                      <label className="float-label">Password</label>
                    </div>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    <div className="row m-t-30">
                      <div className="col-md-12">
                        <button
                          type="submit"
                          className="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20"
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-10">
                        <p className="text-inverse text-left m-b-0">
                          Thank you.
                        </p>
                        <p className="text-inverse text-left">
                          <Link to="/signup">Sing Up</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
