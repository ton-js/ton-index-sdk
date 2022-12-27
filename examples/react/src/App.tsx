
import React, { useEffect, useState } from 'react';

import {
  TonIndexClient,
  FetchHttpClient,
  getActiveAccountsCountInPeriod,

} from '@ton.js/ton-index-sdk';

import logo from './logo.svg';
import './App.css';


const dayDurationMs = (24 * 60 * 60 * 1_000);

const indexClient = new TonIndexClient({
  httpClient: new FetchHttpClient(),
});


function App() {

  const [count, setCount] = useState<number>(0);

  /**
   * This is just a trivial example, use something like
   * `react-query` in a real application.
   */
  useEffect(() => {

    const interval = setInterval(async () => {

      const yesterday = new Date(
        Date.now() - dayDurationMs
      );

      const result = await getActiveAccountsCountInPeriod(
        indexClient, {
          startUtime: yesterday,
        },
      );

      setCount(result.count);

    }, 1_000);

    // On unmount
    return () => clearInterval(interval);

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          TON transaction in last 24 hours:<br/>
          <strong>{ count.toLocaleString('en') }</strong>
        </p>
      </header>
    </div>
  );

}

export default App;
