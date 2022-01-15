import http from "../services/httpService";

import { toast } from "react-toastify";
const { createContext, useState, useEffect } = require("react");

export const ClassContext = createContext();
const ClassContextProvider = (props) => {
  const url = "http://localhost:3000/api/classes";
  const stdUrl = "http://localhost:3000/api/students/class";

  const [classes, setClasses] = useState([]);

  const read = async () => {
    const { data } = await http.get(url);

    setClasses(data);
  };

  //add
  const addClass = async (name) => {
    await http.post(url, { name: name });
    setClasses([...classes, { name }]);
  };

  //update
  const editClass = async (id, updatedClass) => {
    try {
      await http.put(`${url}/${id}`, updatedClass);
      setClasses(
        classes.map((classe) => (classe._id === id ? updatedClass : classe))
      );
    } catch (error) {
      console.log(error);
    }
  };

  //stdPerClass
  const stdPerClass = async (id) => {
    const { data: std } = await http.get(`${stdUrl}/${id}`);
    const stud = Object.keys(std).length;
    return stud;
  };

  const deleteClass = async (id) => {
    const { data: std } = await http.get(`${stdUrl}/${id}`);

    if (std.length === 0) {
      await http.delete(`${url}/${id}`);
      setClasses(classes.filter((classe) => classe._id !== id));
      toast("Class Deleted Successfully");
    } else {
      toast("You Cant delete this Class");
    }
  };

  useEffect(() => {
    read();

    return () => {};
  }, []);

  return (
    <ClassContext.Provider
      value={{ classes, editClass, addClass, stdPerClass, deleteClass }}
    >
      {props.children}
    </ClassContext.Provider>
  );
};

export default ClassContextProvider;
