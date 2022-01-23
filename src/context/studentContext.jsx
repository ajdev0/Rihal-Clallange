import http from "../services/httpService";
import { toast } from "react-toastify";
import api from "../config.json";
const { createContext, useEffect, useState } = require("react");

export const StudentContext = createContext();

const StudentContextProvider = (props) => {
  const url = `${api.API_URL}api/students`;

  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  const read = async () => {
    const { data } = await http.get(url);

    setStudents(data);
  };

  //add
  const addStudent = async (name, classeId, countryId, dateOfBirth) => {
    try {
      await http.post(url, {
        name: name,
        classeId: classeId,
        countryId: countryId,
        dateOfBirth: dateOfBirth,
      });
      setStudents([...students, { name, classeId, countryId, dateOfBirth }]);
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

  //update
  const editStudent = async (id, updatedStudent) => {
    try {
      await http.put(`${url}/${id}`, updatedStudent);
      setStudents(
        students.map((student) =>
          student._id === id ? updatedStudent : student
        )
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

  const deleteStudent = async (id) => {
    await http.delete(`${url}/${id}`);
    setStudents(students.filter((student) => student._id !== id));
    toast("Student Deleted Successfully");
  };

  // students per country
  const stdPerCountry = async (id) => {
    const { data: std } = await http.get(`${url}/country/${id}`);
    const stud = Object.keys(std).length;
    return stud;
  };
  const stdAvgAges = async () => {
    const { data: std } = await http.get(`${url}/ages`);
    return std;
  };

  useEffect(() => {
    read();

    return () => {};
  }, []);
  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        editStudent,
        stdPerCountry,
        stdAvgAges,
        deleteStudent,
        error,
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
};
export default StudentContextProvider;
