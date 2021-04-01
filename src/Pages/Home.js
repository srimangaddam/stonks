import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Home.css';
import firebase from 'firebase';
import "firebase/auth";
import {firebaseConfig} from '../firebaseConfig';
import {FirebaseAuthProvider, FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseAuthedAnd} from "@react-firebase/auth";
require('dotenv').config()

export default function Home() {
    const [dailyGainer,
        setDailyGainer] = useState([]);
    const [dailyLoser,
        setDailyLoser] = useState([]);
    const gainerUrl = 'https://financialmodelingprep.com/api/v3/gainers?apikey=' + process.env.REACT_APP_API_KEY;
    const loserUrl = 'https://financialmodelingprep.com/api/v3/losers?apikey=' + process.env.REACT_APP_API_KEY;

    useEffect(() => {
        axios
            .get(gainerUrl)
            .then(response => setDailyGainer(response.data));
    }, []);

    useEffect(() => {
        axios
            .get(loserUrl)
            .then(response => setDailyLoser(response.data));
    }, []);

    const showGainLoss = () => {
        return (
            <div>
                <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
                    <div>
                        <button
                            onClick={() => {
                            const googleAuthProvider = new firebase
                                .auth
                                .GoogleAuthProvider();
                            firebase
                                .auth()
                                .signInWithPopup(googleAuthProvider);
                        }}>
                            Sign In with Google
                        </button>
                        <button
                            data-testid="signin-anon"
                            onClick={() => {
                            firebase
                                .auth()
                                .signInAnonymously();
                        }}>
                            Sign In Anonymously
                        </button>
                        <button
                            onClick={() => {
                            firebase
                                .auth()
                                .signOut();
                        }}>
                            Sign Out
                        </button>
                        <FirebaseAuthConsumer>
                            {({isSignedIn, user, providerId}) => {
                                return (
                                    <pre style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
                                );
                            }}
                        </FirebaseAuthConsumer>
                        <div>
                            <IfFirebaseAuthed>
                                {() => {
                                    return <div>You are authenticated</div>;
                                }}
                            </IfFirebaseAuthed>
                            <IfFirebaseAuthedAnd filter={({providerId}) => providerId !== "anonymous"}>
                                {({providerId}) => {
                                    return <div>You are authenticated with {providerId}</div>;
                                }}
                            </IfFirebaseAuthedAnd>
                        </div>
                    </div>
                </FirebaseAuthProvider>
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

    return (showGainLoss());
}