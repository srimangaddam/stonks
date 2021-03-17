import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Marquee from 'react-fast-marquee';
import './Home.css';

export default function Home() {
    const [dailyGainer, setDailyGainer] = useState([]);
    const [dailyLoser, setDailyLoser] = useState([]);
    const [gainerOn, setGainerOn] = useState(true);
    const gainerUrl = 'https://financialmodelingprep.com/api/v3/gainers?apikey=a57a32f81dce767cfc8cdf7b8ab4cd39';
    const loserUrl =  'https://financialmodelingprep.com/api/v3/losers?apikey=a57a32f81dce767cfc8cdf7b8ab4cd39';

    useEffect(() => {
        axios.get(gainerUrl)
        .then(response => setDailyGainer(response.data));
    },[]);

    useEffect(() => {
        axios.get(loserUrl)
        .then(response => setDailyLoser(response.data));
    },[]);

    const showGainLoss = () => {
        if (gainerOn) {
        return (
        <div class="gainOn">
        
        <Marquee >
            {dailyGainer.map((item) => (
                <li key={item.id} class="gains">
                    {item.ticker}      {item.changesPercentage}
                </li>

            ))}
        </Marquee>
    </div>
        );
}
        else {
            return (
                <div>
                
                <Marquee >
                    {dailyLoser.map((item) => (
                        <li key={item.id} class="losses">
                            {item.ticker}  {item.changesPercentage}
                        </li>
            
                    ))}
                </Marquee>
            </div>
                );
            };
            
        }


const showLoser = () => {
    return (
    <div>
    
    <ul class="losers" >
        {dailyLoser.map((item) => (
            <li key={item.id}>
                {item.ticker}  {item.changesPercentage}
            </li>

        ))}
    </ul>
</div>
    );
};

        
    return (
       showGainLoss()
    )
}