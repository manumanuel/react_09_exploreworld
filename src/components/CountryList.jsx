import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../../contexts/useCities";

function CountryList() {
  const { cities, loadingStatus } = useCities();
  if (loadingStatus) return <Spinner />;
  if (cities.length === 0) return <Message message="No countries added." />;

  const countries = cities.reduce((acc, city) => {
    if (!acc.map((c) => c.country).includes(city.country)) {
      return [...acc, { country: city.country, emoji: city.emoji }];
    } else return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.emoji} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
