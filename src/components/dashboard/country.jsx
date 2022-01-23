import React, { useContext, useState, useEffect } from "react";
import { StudentContext } from "../../context/studentContext";
import Loading from "../common/loading";
const Country = ({ country }) => {
  const { stdPerCountry } = useContext(StudentContext);
  const [stdCount, setStdCount] = useState([]);
  const getstdPerCountry = async () => {
    const std = await stdPerCountry(country._id);

    setStdCount(std);
  };

  useEffect(() => {
    getstdPerCountry();
  }, [stdPerCountry]);
  return (
    <>
      <td>{country.name}</td>
      <td>{stdCount}</td>
    </>
  );
};

export default Country;
