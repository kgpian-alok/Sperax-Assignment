import React, { useState } from "react";
import { JsonRpcProvider, formatEther, Contract } from "ethers";
import erc20ABI from "../erc20ABI";

const AllowanceChecker = ({ walletAddress }) => {
  const [allowance, setAllowance] = useState(null);
  const [tokenAddress, setTokenAddress] = useState("");
  const [spenderAddress, setSpenderAddress] = useState("");

  const checkAllowance = async () => {
    const provider = new JsonRpcProvider("http://127.0.0.1:8545");
    const tokenContract = new Contract(tokenAddress, erc20ABI, provider);
    const allowance = await tokenContract.allowance(walletAddress, spenderAddress);
    setAllowance(formatEther(allowance));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Token Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Spender Address"
        value={spenderAddress}
        onChange={(e) => setSpenderAddress(e.target.value)}
      />
      <button onClick={checkAllowance}>Check Allowance</button>
      <div>Allowance: {allowance}</div>
    </div>
  );
};

export default AllowanceChecker;
