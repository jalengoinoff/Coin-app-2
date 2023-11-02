import React, { useState } from 'react';
import Slider from 'react-slick'

export default function Carousel() {
const [carouselData, setCarouselData] = useState([]);

    const sliderSettings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
    }
    useEffect(() => {
        Axios.get('https://openapiv1.coinstats.app/coins?limit=20&currency=usd', {
            headers: {
                'X-API-KEY': '3/9xM4/uXG1A1dK5Cce39EO0eSbFKJAxEqasf8W7B5s='
            }
        }).then((res) => {
            setCarouselData(res.data.result);
            
        });
    }, []);
      return (
        <div className='content'>
          <Slider {...sliderSettings}>
            {fetchFiatCurrencies.map((card, index) => (
              <div key={index}>
                <h2>{card.name}</h2>
                <img alt={card.name} src={card.icon} width="100" height="100" />
               
                <ul>
                  {card.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              
              </div>
            ))}
          </Slider>
        </div>
      )
    }

