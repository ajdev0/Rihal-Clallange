import React, { useState, useEffect, useContext } from "react";
import { ClassContext } from "../../context/classesContext";

const Classe = ({ classe }) => {
  const { stdPerClass } = useContext(ClassContext);
  const [stdCount, setStdCount] = useState([]);
  const getStdPerClass = async () => {
    const std = await stdPerClass(classe._id);
    setStdCount(std);
    console.log(std);
  };

  useEffect(() => {
    getStdPerClass();
  }, [stdPerClass]);
  return (
    <>
      <td>{classe.name}</td>
      <td>{stdCount}</td>
    </>
  );
};

export default Classe;
