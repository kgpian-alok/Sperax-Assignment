import React, { useState } from "react";
import { JsonRpcProvider, formatEther, Contract } from "ethers";
import erc20ABI from "../erc20ABI";

const WatchList = ({ walletAddress }) => {
  const [tokens, setTokens] = useState([]);
  const [tokenAddress, setTokenAddress] = useState("");

  const addToken = async () => {
    const provider = new JsonRpcProvider("http://127.0.0.1:8545");
    const tokenContract = new Contract(tokenAddress, erc20ABI, provider);
    const balance = await tokenContract.balanceOf(walletAddress);
    setTokens([
      ...tokens,
      { address: tokenAddress, balance: formatEther(balance) },
    ]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter token address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <button onClick={addToken}>Add Token</button>
      <table>
        <thead>
          <tr>
            <th>Token Address</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={index}>
              <td>{token.address}</td>
              <td>{token.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WatchList;
