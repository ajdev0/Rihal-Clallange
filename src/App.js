import "./App.css";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/dashboard/dashboard";
import Signup from "./components/signup/signup";
import Login from "./components/login/login";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/common/protectedRoute";
import Navbar from "./components/common/navBar";
import "bootstrap/dist/css/bootstrap.css";
import Sidebar from "./components/common/sideBar";
import Sidemenu from "./components/common/sidemenu";
import ClassList from "./components/pages/classes/classList";
import CountriesList from "./components/pages/countries/countriesList";
import Profile from "./components/pages/profile";
import ClassContextProvider from "./context/classesContext";
import AllClasses from "./components/dashboard/allClasses";
import StudentContextProvider from "./context/studentContext";
import StudentsList from "./components/pages/students/studentsList";
import CountryContextProvider from "./context/countriesContext";
import AllCountries from "./components/dashboard/allCountries";
import AllStudents from "./components/dashboard/allStudents";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { GlobalStyles } from "./globalStyles";
import { useDarkMode } from "./components/common/useDarkMode";
const StyledApp = styled.div``;
function App() {
  const user = localStorage.getItem("token");

  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  return (
    <>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <ToastContainer />
        {!user && <Navbar themeToggler={themeToggler} />}

        <div id="pcoded" className="pcoded">
          <div className="pcoded-overlay-box"></div>
          <div className="pcoded-container navbar-wrapper">
            {user && <Sidebar themeToggler={themeToggler} />}
            <div className="pcoded-main-container">
              <div className="pcoded-wrapper">
                {user && <Sidemenu />}
                <div className="pcoded-content space">
                  <Routes>
                    {user && (
                      <Route
                        path="/"
                        exact
                        element={
                          <ClassContextProvider>
                            <CountryContextProvider>
                              <StudentContextProvider>
                                <Dashboard />
                              </StudentContextProvider>
                            </CountryContextProvider>
                          </ClassContextProvider>
                        }
                      />
                    )}
                    {!user && (
                      <Route path="/signup" exact element={<Signup />} />
                    )}
                    {!user && <Route path="/login" exact element={<Login />} />}
                    <Route
                      path="/"
                      element={<Navigate replace to="/login" />}
                    />

                    <Route
                      path="/students"
                      exact
                      element={
                        <ProtectedRoute>
                          <StudentContextProvider>
                            <ClassContextProvider>
                              <CountryContextProvider>
                                <StudentsList />
                              </CountryContextProvider>
                            </ClassContextProvider>
                          </StudentContextProvider>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/classes"
                      exact
                      element={
                        <ProtectedRoute>
                          <ClassContextProvider>
                            <ClassList />
                          </ClassContextProvider>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/countries"
                      exact
                      element={
                        <ProtectedRoute>
                          <CountryContextProvider>
                            <CountriesList />
                          </CountryContextProvider>
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/profile"
                      exact
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/allClasses"
                      exact
                      element={
                        <ProtectedRoute>
                          <ClassContextProvider>
                            <AllClasses />
                          </ClassContextProvider>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/allCountries"
                      exact
                      element={
                        <ProtectedRoute>
                          <CountryContextProvider>
                            <StudentContextProvider>
                              <AllCountries />
                            </StudentContextProvider>
                          </CountryContextProvider>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/allStudents"
                      exact
                      element={
                        <ProtectedRoute>
                          <StudentContextProvider>
                            <AllStudents />
                          </StudentContextProvider>
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
