import { useEffect, useState } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const API_URL = "http://localhost:5000";

function App() {
  const [cityList, setCityList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/layout" element={<AppLayout />}>
          <Route index element={<Navigate to="cities" replace />} />
          <Route
            path="cities"
            element={<CityList cities={cityList} loadingStatus={isLoading} />}
          />
          <Route path="cities/:id" element={<City />} />
          <Route
            path="countries"
            element={
              <CountryList cities={cityList} loadingStatus={isLoading} />
            }
          />
          <Route path="form" element={<Form />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
