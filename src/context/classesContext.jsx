import http from "../services/httpService";
import api from "../config.json";
import { toast } from "react-toastify";
const { createContext, useState, useEffect } = require("react");

export const ClassContext = createContext();
const ClassContextProvider = (props) => {
  const url = `${api.API_URL}api/classes`;
  const stdUrl = `${api.API_URL}api/students/class`;

  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");

  const read = async () => {
    const { data } = await http.get(url);

    setClasses(data);
  };

  const classeName = async (id) => {
    const { data } = await http.get(`${url}/${id}`);
    setClasses(data);
  };
  //add
  async function addClass(name) {
    try {
      await http.post(url, { name: name });
      setClasses([...classes, { name }]);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  }

  //update
  const editClass = async (id, updatedClass) => {
    try {
      await http.put(`${url}/${id}`, updatedClass);
      setClasses(
        classes.map((classe) => (classe._id === id ? updatedClass : classe))
      );
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
      value={{
        classes,
        editClass,
        addClass,
        stdPerClass,
        deleteClass,
        classeName,
        error,
      }}
    >
      {props.children}
    </ClassContext.Provider>
  );
};

export default ClassContextProvider;
