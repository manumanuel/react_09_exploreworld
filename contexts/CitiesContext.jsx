import { createContext, useEffect, useReducer, useState } from "react";
import { API_URL } from "../api";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  /* -- USING CONTEXT ONLY -- */
  /* 
   const [cityList, setCityList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/cities`);
        const data = await response.json();
        setCityList(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  async function getCity(id) {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      console.error("Error fetching city:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addCity(newCity) {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await response.json();
      setCityList((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error adding city:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(cityId) {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/cities/${cityId}`, {
        method: "DELETE",
      });
      setCityList((prev) => prev.filter((city) => city.id !== cityId));
    } catch (error) {
      console.error("Error deleting city:", error);
    } finally {
      setIsLoading(false);
    }
  }
  */

  /* -- USING CONTEXT+ useReducer ONLY -- */

  // Step 1: Define the initial state

  const initialState = {
    cityList: [],
    isLoading: false,
    currentCity: {},
  };

  //Step 3: Define the reducer function based on the actions

  function reducer(state, action) {
    switch (action.type) {
      case "loading":
        return { ...state, isLoading: true };
      case "loading/cities":
        return { ...state, isLoading: false, cityList: action.payload };
      case "loading/city":
        return { ...state, isLoading: false, currentCity: action.payload };
      case "city/add":
        return {
          ...state,
          isLoading: false,
          cityList: [...state.cityList, action.payload],
          currentCity: action.payload,
        };
      case "city/delete":
        return {
          ...state,
          isLoading: false,
          cityList: state.cityList.filter((city) => city.id !== action.payload),
          currentCity: {},
        };
      case "rejected":
        return { ...state, isLoading: false, error: action.payload };
      case "error":
        return { ...state, error: action.payload };
      default:
    }
  }

  // Step 2: Use the reducer
  const [{ cityList, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading", payload: true });
      try {
        const response = await fetch(`${API_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "loading/cities", payload: data });
      } catch {
        dispatch({ type: "error", payload: "Issue on fetching cities" });
      }
    };
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading", payload: true });
    const response = await fetch(`${API_URL}/cities/${id}`);
    try {
      const data = await response.json();
      dispatch({ type: "loading/city", payload: data });
    } catch {
      dispatch({ type: "error", payload: "Error fetching city" });
    }
  }

  async function addCity(newCity) {
    dispatch({ type: "loading", payload: true });
    try {
      const response = await fetch(`${API_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await response.json();
      dispatch({ type: "city/add", payload: data });
    } catch {
      dispatch({ type: "error", payload: "Error adding city" });
    }
  }

  async function deleteCity(cityId) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${API_URL}/cities/${cityId}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/delete", payload: cityId });
    } catch {
      dispatch({ type: "rejected", payload: "Error deleting city" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities: cityList,
        loadingStatus: isLoading,
        currentCity,
        getCity,
        addCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
