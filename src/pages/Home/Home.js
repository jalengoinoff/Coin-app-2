import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';
import styles from "./Home.module.css";

export default function Home() {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    Axios.get('https://openapiv1.coinstats.app/coins?limit=20&currency=usd', {
        headers: {
            'X-API-KEY': '3/9xM4/uXG1A1dK5Cce39EO0eSbFKJAxEqasf8W7B5s='
        }
    }).then((res) => {
        setCarouselData(res.data.result);
         console.log(res.data.result);
    });
}, []);

  return (
    <>
     {carouselData.length && (
    <MDBCarousel fade>
      {carouselData.map((data, index) => (
        <MDBCarouselItem
          key={index}
          style={{ height: 200 }}
          itemId={index + 1}
          alt={data.name}
          src={data.icon}
        >
          <a href={`/coins/${data.id}`}>
            <h5 className='custom-carousel-title' style={{ color: 'black' }}>
              {data.rank}
            </h5>
            <h5 className='custom-carousel-title' style={{ color: 'black' }}>
              {data.name}
            </h5>
          </a>
        </MDBCarouselItem>
      ))}
    </MDBCarousel>
  )}
    


      <section className={styles["section__container"]}>
      <h2>🌌 Trade for hundreds of coins</h2>
        <p>Top cryptocurrency prices and charts, listed by market capitalization. Define your investment goals, such as short-term trading, long-term holding, or a specific financial target.</p>
      </section>

      <section className={styles["section__container"]}>
        <h2>🌍Risk Tolerance:</h2>
        <p>Understand your risk tolerance. Are you comfortable with high volatility and potential losses? Adjust your investment strategy accordingly. Spread your investments across different cryptocurrencies.</p>
      </section>
    </>
  );
}