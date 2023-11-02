import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import styles from "./Chartdata.module.css";
import { getDoc, collection,setDoc,doc } from "firebase/firestore"; 
import { db } from "../../firebase"; 
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../firebase";
const Chartdata = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const [alert, setAlert] = useState({ open: false, message: "", type: "" });
  useEffect(() => {
    const watchlist = localStorage.getItem("watchlist");
    if (!watchlist) {
      localStorage.setItem("watchlist", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
      Axios.get('https://openapiv1.coinstats.app/coins?limit=20&currency=usd', {
          headers: {
              'X-API-KEY': '3/9xM4/uXG1A1dK5Cce39EO0eSbFKJAxEqasf8W7B5s='
          }
      }).then((res) => {
          setCrypto(res.data.result);
          setLoading(false); 
      });
  }, []);

    const filteredCrypto = crypto.filter((val) => {
        return (
            val.name.toLowerCase().includes(search.toLowerCase()) ||
            val.symbol.toLowerCase().includes(search.toLowerCase())
        );
    });
  
    
 
   
  const addToWatchlist = async (val) => {
    try {
      console.log(user, val);
      if (user) {
        const coinRef = doc(db, "watchlist", user.uid);
        const userDocSnapshot = await getDoc(coinRef);
        const userDocData = userDocSnapshot.data();
        console.log(coinRef, userDocSnapshot, userDocData);
  
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
          console.log("Coin added to watchlist");
        } else if (!userDocData?.result) {
          await setDoc(
            coinRef,
            {
              result: [newCoin],
            },
            { merge: true }
          );
          console.log("Coin added to watchlist");
        } else {
          console.log("Coin already in watchlist");
        }
      }
    } catch (error) {
      console.error("Error adding coin to watchlist:", error);
    }
  };
  
  
  
  
    return (
        <div className="App">
          <h1>All Cryptocurrencies</h1>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
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
              {filteredCrypto.map((val) => {
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
                      <td className={styles["td-spacing"]}>${val.marketCap.toLocaleString()}</td>
                      <td className={styles["td-spacing"]}>${val.price.toFixed(2).toLocaleString()}</td>
             
                      <button
                        onClick={(e) => {
                          addToWatchlist(val);
                          e.stopPropagation();
                        }}
                      >
                        Add to Watchlist
                      </button>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      );
}

export default Chartdata;
