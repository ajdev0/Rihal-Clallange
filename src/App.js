import "./App.css";
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
import Student from "./components/pages/students/student";
import ClassList from "./components/pages/classes/classList";
import Countries from "./components/pages/countries/countries";
import Users from "./components/pages/profile/users";
import Profile from "./components/pages/profile";
import ClassContextProvider from "./context/classesContext";
function App() {
  const user = localStorage.getItem("token");

  return (
    <>
      <ToastContainer />
      {!user && <Navbar />}

      <div id="pcoded" className="pcoded">
        <div className="pcoded-overlay-box"></div>
        <div className="pcoded-container navbar-wrapper">
          {user && <Sidebar />}
          <div className="pcoded-main-container">
            <div className="pcoded-wrapper">
              {user && <Sidemenu />}
              <div className="pcoded-content space">
                <Routes>
                  {user && <Route path="/" exact element={<Dashboard />} />}
                  <Route path="/signup" exact element={<Signup />} />
                  <Route path="/login" exact element={<Login />} />
                  <Route path="/" element={<Navigate replace to="/login" />} />

                  <Route path="/students" exact element={<Student />} />
                  <Route
                    path="/classes"
                    exact
                    element={
                      <ClassContextProvider>
                        <ClassList />
                      </ClassContextProvider>
                    }
                  />
                  <Route path="/countries" exact element={<Countries />} />
                  <Route path="/users" exact element={<Users />} />
                  <Route path="/profile" exact element={<Profile />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
