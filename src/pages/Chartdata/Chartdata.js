import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./Chartdata.module.css";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const Chartdata = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(10);

  const [user] = useAuthState(auth);

  useEffect(() => {
    const watchlist = localStorage.getItem("watchlist");
    if (!watchlist) {
      localStorage.setItem("watchlist", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://openapiv1.coinstats.app/coins?limit=1000&currency=usd', {
          headers: {
            'X-API-KEY': '3/9xM4/uXG1A1dK5Cce39EO0eSbFKJAxEqasf8W7B5s='
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        setCrypto(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const addToWatchlist = async (val) => {
    try {
      if (user) {
        const coinRef = doc(db, "watchlist", user.uid);
        const userDocSnapshot = await getDoc(coinRef);
        const userDocData = userDocSnapshot.data();

        const newCoin = {
          rank: val.rank,
          marketCap: val.marketCap,
          icon: val.icon,
          symbol: val.symbol,
          name: val.name,
          price: val.price,
        };

        if (
          userDocData?.result &&
          !userDocData.result.some((coin) => coin.name === newCoin.name)
        ) {
          await setDoc(
            coinRef,
            {
              result: [...userDocData.result, newCoin],
            },
            { merge: true }
          );
          alert("Coin added to watchlist");
        } else if (!userDocData?.result) {
          await setDoc(
            coinRef,
            {
              result: [newCoin],
            },
            { merge: true }
          );
          alert("Coin added to watchlist");
        } else {
          alert("Coin already in watchlist");
        }
      }
    } catch (error) {
      console.error("Error adding coin to watchlist:", error);
    }
  };
  const filterCrypto = () => {
    return crypto.filter((val) => {
      return (
        val.name.toLowerCase().includes(search.toLowerCase()) ||
        val.symbol.toLowerCase().includes(search.toLowerCase())
      );
    });
  };

  const filteredCrypto = filterCrypto();
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredCrypto.slice(indexOfFirstCoin, indexOfLastCoin);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="App">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Kdam+Thmor+Pro&display=swap" rel="stylesheet" />
      </head>


      <div className="container mt-3">
        <h1 style={{ fontFamily: 'Abril Fatface', fontSize: '2em' }}>All Cryptocurrencies</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-secondary" type="button">
              Search
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <td>Rank</td>
              <td>Name</td>
              <td>Symbol</td>
              <td>Market Cap</td>
              <td>Price</td>
              <td>Watchlist</td>
            </tr>
          </thead>
          <tbody>
            {currentCoins.map((val) => {
              return (
                <tr
                  onClick={() => navigate(`/coins/${val.id}`)}
                  key={val.name}
                  className={styles["crypto-row"]}
                >
                  <td className={styles["td-spacing"]}>{val.rank}</td>
                  <td className={styles["td-spacing"]}>
                    <a href={val.websiteUrl}>
                      <img src={val.icon} alt="logo" width="30px" />
                    </a>
                    <p>{val.name}</p>
                  </td>
                  <td className={styles["td-spacing"]}>{val.symbol}</td>
                  <td className={styles["td-spacing"]}>
                    ${val.marketCap.toLocaleString()}
                  </td>
                  <td className={styles["td-spacing"]}>
                    ${val.price.toLocaleString()}
                  </td>
                  <td className="text-center">
                  <td className="text-center">
  <button
    onClick={(e) => {
      addToWatchlist(val);
      e.stopPropagation();
    }}
    className="btn btn-secondary"
  >
    Add to Watchlist
  </button>
</td>
</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className={styles.pagination}>
          {currentPage > 1 && (
            <button onClick={() => paginate(currentPage - 1)}>Previous</button>
          )}
          <button onClick={() => paginate(currentPage)}>{currentPage}</button>
          {currentPage < Math.ceil(filteredCrypto.length / coinsPerPage) && (
            <button onClick={() => paginate(currentPage + 1)}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chartdata;