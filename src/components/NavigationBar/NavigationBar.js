import React from 'react';
import styles from "./NavigationBar.module.css";

function NavigationBar() {
  return (
    <nav className={styles.navbarCustom}>
      <ul className={styles.navList}>
        <li className={styles.navItem}><a href="/" className={styles.navLink}>🌎 Home</a></li>
        <li className={styles.navItem}><a href="/chartdata" className={styles.navLink}>💰 Chartdata</a></li>
        <li className={styles.navItem}><a href="/watchlist" className={styles.navLink}>📊 Watchlist</a></li>
        <li className={styles.navItem}><a href="/news" className={styles.navLink}>🗞 News</a></li>
        <li className={styles.navItem}><a href="/account" className={styles.navLink}>🌐 Account</a></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;


