
import styles from "./Crypto.module.css";

function Crypto ()
{
  return (
    <div className={styles["crypto"]}>
      <span className={styles["crypto__text"]}>Invest in your future</span>
      <span className={styles["crypto__emojis"]}>🔑💸🤑💰</span>
    </div>
  );
}

export default Crypto;
