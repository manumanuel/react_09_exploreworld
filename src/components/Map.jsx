import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();
  return (
    <div className={styles.mapContainer}>
      <h1>Map info</h1>
      Map info - Lat: {lat}, Lng: {lng}
      <button onClick={() => navigate("form")}>back</button>
    </div>
  );
}

export default Map;
