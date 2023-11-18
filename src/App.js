import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom"; 
import styles from "./App.module.css";
import { ChartdataContext } from "./context/ChartdataProvider";
import Header from './components/Header/Header';
import NavigationBar from "./components/NavigationBar/NavigationBar";
import AppRoute from "./routes/AppRoute";
import Crypto from "./components/Crypto/Crypto";
import Loading from "./components/Loading/Loading";

function App() {
  const { isLoading } = useContext(ChartdataContext);


  return (
    <>
      <BrowserRouter>
        <div className={styles["app"]}>
          <header className={styles["app__header"]}>
            <Header />
            <NavigationBar />
          </header>

          <main className={styles["app__main"]}>
            <AppRoute />
          </main>

          <footer className={styles["app__footer"]}>
            <Crypto />
          </footer>
        </div>
      </BrowserRouter>

      {isLoading && <Loading />}
    </>
  );
}

export default App;

