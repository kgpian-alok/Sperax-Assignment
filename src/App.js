import React, { useState } from 'react';
import WalletConnection from './components/WalletConnection';
import WatchList from './components/WatchList';
import HistoricalData from './components/HistoricalData';
import AllowanceChecker from './components/AllowanceChecker';
import TokenTransfer from './components/TokenTransfer';
import './styles.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');

  return (
    <div className="App">
      <h1>Token Watchlist App</h1>
      <WalletConnection setWalletAddress={setWalletAddress} />
      <hr />
      {walletAddress && (
        <>
          <input
            type="text"
            placeholder="Enter Token Address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
          <WatchList walletAddress={walletAddress} />
          <hr />
          {tokenAddress && (
            <HistoricalData tokenAddress={tokenAddress} walletAddress={walletAddress} />
          )}
          <hr />
          <AllowanceChecker walletAddress={walletAddress} />
          <hr />
          <TokenTransfer walletAddress={walletAddress} />
        </>
      )}
    </div>
  );
}

export default App;
