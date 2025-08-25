import styles from "./CountryItem.module.css";
function CountryItem({ country }) {
  const { emoji, country: countryName } = country;
  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{countryName}</h3>
    </li>
  );
}
export default CountryItem;
