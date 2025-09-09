// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useLocationUrl } from "../hooks/useLocationUrl";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../contexts/useCities";

/*
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
} */

function Form() {
  const BASEURL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const { lat, lng } = useLocationUrl();
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const { addCity, loadingStatus } = useCities();

  useEffect(() => {
    async function fetchCityData() {
      try {
        if (!lat || !lng) return;
        setLocationLoading(true);
        setLocationError("");
        const response = await fetch(
          `${BASEURL}latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        //console.log(data);
        setCityName(data.city || data.locality || "");
        if (data.countryCode.length < 1) {
          throw new Error("No country found, Try other coordinates");
        }
        setCountry(data.countryName || "");
        setLocationLoading(false);
      } catch (err) {
        setLocationError(err.message);
      } finally {
        setLocationLoading(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  const navigate = useNavigate();

  function handleCitySubmit(e) {
    e.preventDefault();
    if (!lat || !lng) {
      return <Message message="Location not found" />;
    }
    addCity({
      cityName,
      country,
      // emoji,
      date,
      notes,
      position: { lat, lng },
    });
    navigate("/layout");
  }

  if (locationError) {
    return <Message message={locationError} />;
  }

  return (
    <form className={styles.form} onSubmit={handleCitySubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd-MM-yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
