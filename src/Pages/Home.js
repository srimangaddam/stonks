import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

export default function Home() {
    const [dailyGainer, setDailyGainer] = useState([]);
    const [dailyLoser, setDailyLoser] = useState([]);
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
        return (
        <div>
        
        <ul class="marquee">
            {dailyGainer.map((item) => (
                <ul key={item.id} class="gains">
                    {item.ticker}{item.changesPercentage}
                </ul>
            ))}
            {dailyLoser.map((item) => (
                        <ul key={item.id} class="losses">
                            {item.ticker}{item.changesPercentage}
                        </ul>
            
                    ))}
        </ul>
        
    </div>
        );

            
        }

        
    return (
       showGainLoss()
    );
}