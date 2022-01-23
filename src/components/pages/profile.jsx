import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
const Profile = () => {
  const [user, setUser] = useState([]);
  const getUser = async () => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);

    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);
  return <div className="col-xl-3 col-md-6">welcome {user.name}</div>;
};

export default Profile;
