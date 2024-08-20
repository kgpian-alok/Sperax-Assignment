import React, { useState } from 'react';
import { ethers } from 'ethers';
import erc20ABI from '../erc20ABI';

const TokenTransfer = ({ walletAddress }) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const transferTokens = async () => {
    try {
      // Connect to the Anvil local blockchain
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

      // Use the private key to create a signer
      const privateKey = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'; // Replace with the private key from Anvil
      const signer = new ethers.Wallet(privateKey, provider);

      // Connect to the ERC-20 contract using the signer
      const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);

      // Send the transaction to transfer tokens
      const tx = await tokenContract.transfer(recipient, ethers.parseUnits(amount, 18)); // 18 decimals
      await tx.wait(); // Wait for the transaction to be mined

      alert('Transfer successful');
    } catch (error) {
      console.error("Error during transfer:", error);
      alert(error);
      alert("Transfer failed. Please check the addresses and amount.");
    }
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
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={transferTokens}>Transfer Tokens</button>
    </div>
  );
};

export default TokenTransfer;
