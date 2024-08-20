import React, { useState } from 'react';
import { JsonRpcProvider, Contract } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import Chart from 'chart.js/auto';
import erc20ABI from '../erc20ABI';

const HistoricalData = ({ tokenAddress, walletAddress }) => {
  const [historicalData, setHistoricalData] = useState([]);

  const fetchHistoricalData = async () => {
    if (!tokenAddress || !walletAddress) {
      console.error("Token address or wallet address is missing");
      return;
    }

    try {
      const provider = new JsonRpcProvider('http://localhost:8545');
      const tokenContract = new Contract(tokenAddress, erc20ABI, provider);

      // Debugging logs
      console.log("Token Contract:", tokenContract);
      console.log("Token Contract Address:", tokenContract.address);
      console.log("Token Contract Functions:", tokenContract.functions);
      console.log("Token Contract Interface:", JSON.stringify(tokenContract.interface, null, 2));

      const blockNumber = await provider.getBlockNumber();
      const historicalBalances = [];

      for (let i = blockNumber - 10; i <= blockNumber; i++) {
        const balance = await tokenContract.balanceOf(walletAddress, { blockTag: i });
        historicalBalances.push({
          blockNumber: i,
          balance: formatEther(balance),
        });
      }

      setHistoricalData(historicalBalances);

      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: historicalBalances.map((d) => Block ${d.blockNumber}),
          datasets: [
            {
              label: 'Balance',
              data: historicalBalances.map((d) => d.balance),
            },
          ],
        },
      });
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchHistoricalData}>Fetch Historical Data</button>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default HistoricalData