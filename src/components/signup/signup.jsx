import React, { useState } from "react";
import http from "../../services/httpService";
import api from "../../config.json";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Signup = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = data;
  const navigate = useNavigate();

  //validatin

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    await e.preventDefault();
    try {
      const url = `${api.API_URL}api/users`;
      await http.post(url, data);
      navigate("/login");
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
                        <h3 className="text-center">Sign Up</h3>
                      </div>
                    </div>
                    <div className="form-group form-primary">
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={name}
                        className="form-control"
                      />
                      <span className="form-bar"></span>
                      <label className="float-label">Your Name</label>
                    </div>

                    <div className="form-group form-primary">
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={email}
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
                        value={password}
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
                          Sign Up
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
                          <Link to="/login">Login</Link>
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

export default Signup;
