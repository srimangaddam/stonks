import TextField from '@material-ui/core/TextField';
import React, {useState} from 'react';
import axios from 'axios';
import {parse} from 'dotenv';
require('dotenv').config()

export default function Search() {
    const [display,
        setDisplay] = useState('noSearch')
    const startURL = 'https://financialmodelingprep.com/api/v3/profile/'
    const endURL = '?apikey=' + process.env.REACT_APP_API_KEY
    let incTicker = []
    const [ticker,
        setTicker] = useState('')
    const [company,
        setCompany] = useState('N/A')
    const [industry,
        setIndustry] = useState('N/A')
    const [description,
        setDescription] = useState('A/A')
    const [city,
        setCity] = useState('N/A')
    const [state,
        setState] = useState('N/A')
    const [zip,
        setZip] = useState('N/A')
    const [country,
        setCountry] = useState('N/A')
    const [website,
        setWebsite] = useState('N/A')
    const [market,
        setmarket] = useState('N/A')
    const [sector,
        setSector] = useState('N/A')
    const [CEO,
        setCEO] = useState('N/A')
    const [image,
        setImage] = useState('N/A')
    const [active,
        setActive] = useState(true)
    const [error,
        setError] = useState('Error')

    const keyPress = (event) => {
        incTicker.push(event.target.value)
        if (event.key === 'Enter') {
            event.preventDefault()
            console.log(incTicker[incTicker.length - 1])
            console.log(startURL + incTicker[incTicker.length - 1] + endURL)
            axios.get(startURL + incTicker[incTicker.length - 1] + endURL).then(response => parseTicker(response.data[0]))
        }
    }
    const parseTicker = (data) => {
        if (data == null) {
            setError('Ticker Not Found')
            setDisplay('Error')
        } else {
            setTicker(data.symbol)
            setCompany(data.companyName)
            setWebsite(data.website)
            if (data.isEtf == true) {
                setDisplay('ETF')
            } else {
                setDisplay('Stock')
            }
        }
    }
    if (display == 'noSearch') {
        return (
            <div>
                <form >
                    <TextField onKeyDown={keyPress} id="standard-basic" label="Standard"/>
                </form>

            </div>
        );
    }

    if (display == 'Stock') {
        return (
            <div>
                <form >
                    <TextField onKeyDown={keyPress} id="standard-basic" label="Standard"/>
                </form>
                <p>Stock Found</p>
                <p>{ticker}</p>
                <p>{company}</p>
                <p>{website}</p>

            </div>

        );

    }
    if (display == 'ETF') {
        return (
            <div>
                <form >
                    <TextField onKeyDown={keyPress} id="standard-basic" label="Standard"/>
                </form>
                <p>ETF Found</p>
                <p>{ticker}</p>
                <p>{company}</p>
            </div>

        );

    }
    if (display == 'Error') {
        return (
            <div>
                <form >
                    <TextField onKeyDown={keyPress} id="standard-basic" label="Standard"/>
                </form>
                <p>{error}</p>
            </div>
        );

    }
}