import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; 
import { getDoc, doc, setDoc} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import styles from "./Watchlist.module.css";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [user] = useAuthState(auth);
  const removeFromWatchlist = (index) => {
    const updatedWatchlist = [...watchlist];
    updatedWatchlist.splice(index, 1);
    setWatchlist(updatedWatchlist);
  
    const userDocRef = doc(db, "watchlist", user.uid);
    setDoc(userDocRef, { result: updatedWatchlist }, { merge: true })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });
  };
  
  
  

  const getWatchlistData = async () => {
    if (user) {
      try {
        const userDocRef = doc(db, "watchlist", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setWatchlist(userData?.result || []);
        } else {
          console.error("Watchlist document does not exist for this user.");
        }
      } catch (error) {
        console.error("Error fetching watchlist data:", error);
      }
    }
  };

  useEffect(() => {
    getWatchlistData();
  }, [user]);

  return (
    <div className={styles.container}>
      <h1>Your Watchlist</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rank</th>
            <th>Symbol</th>
            <th>Market Cap</th>
            <th>Price</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
        {watchlist.map((result, index) => (
  <tr key={index} className={styles.listItem}>
    <td>
      <img src={result.icon} alt={result.name} />
    </td>
    <td>{result.rank}</td> 
    <td>{result.symbol}</td>
    <td>{result.marketCap.toLocaleString()}</td> 
    <td>{result.price.toFixed(2).toLocaleString()}</td>
    <td>
      <button
        onClick={() => {
          removeFromWatchlist(index); 
        }}
        className={styles.removeButton}
      >
        Remove from Watchlist
      </button>
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  )
  
              }
export default Watchlist;
