import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import Graph from "./Graph";
import styles from "./Coindata.module.css";

const Coindata = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);

    const fetchCoin = async () => {
        try {
            const { data } = await axios.get(`https://api.coinstats.app/public/v1/coins/${id}`);
            setCoin(data.coin);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCoin();
    }, []);

    return (
        <div className={styles.coindataContainer}>
            <div className={styles.coindataInfo}>
                <h1>Crypto Info</h1>
                {coin && (
    <div className={styles.coinInfo}>
        <img 
            src={coin?.icon}
            alt={coin?.name}
            height="200"
        />
        <Typography className={styles.rank}>Rank: {(coin?.rank)}</Typography>
        <Typography className={styles.price}>
            Current Price: {Number(coin?.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </Typography>
        <Typography className={styles.name}>Name: {(coin?.name)}</Typography>
        <Typography className={styles.symbol}>Symbol: {(coin?.symbol)}</Typography>
    </div>
)}
            </div>
            <Graph coin={coin} />
        </div>
    );
}

export default Coindata;

