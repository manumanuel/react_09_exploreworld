import { useCities } from "../../contexts/useCities";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CityList() {
  const { cities, loadingStatus } = useCities();
  if (loadingStatus) return <Spinner />;
  if (cities.length === 0) return <Message message="No cities found." />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
