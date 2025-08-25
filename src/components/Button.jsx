import styles from "./Button.module.css";

function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
}

export default Button;
