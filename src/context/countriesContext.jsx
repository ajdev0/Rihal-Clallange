import http from "../services/httpService";
import { toast } from "react-toastify";
import api from "../config.json";
const { createContext, useEffect, useState } = require("react");

export const CountryContext = createContext();

const CountryContextProvider = (props) => {
  const url = `${api.API_URL}api/countries`;
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");

  const read = async () => {
    const { data } = await http.get(url);

    setCountries(data);
  };

  //add
  const addCountry = async (name, code) => {
    try {
      await http.post(url, {
        name: name,
        code: code,
      });
      setCountries([...countries, { name, code }]);
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
  const editCountry = async (id, updatedCountry) => {
    try {
      await http.put(`${url}/${id}`, updatedCountry);
      setCountries(
        countries.map((country) =>
          country._id === id ? updatedCountry : country
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

  const deleteCountry = async (id) => {
    await http.delete(`${url}/${id}`);
    setCountries(countries.filter((country) => country._id !== id));
    toast("Country Deleted Successfully");
  };

  useEffect(() => {
    read();

    return () => {};
  }, []);
  return (
    <CountryContext.Provider
      value={{
        countries,
        addCountry,
        editCountry,
        deleteCountry,
        error,
      }}
    >
      {props.children}
    </CountryContext.Provider>
  );
};
export default CountryContextProvider;
