import React, { useState } from "react";
import { JsonRpcProvider, parseEther, Contract } from "ethers";
import erc20ABI from "../erc20ABI";

const TokenTransfer = ({ walletAddress }) => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const transferTokens = async () => {
    const provider = new JsonRpcProvider("http://127.0.0.1:8545");
    const signer = provider.getSigner(); // Assume the first account from Anvil is the signer
    const tokenContract = new Contract(tokenAddress, erc20ABI, signer);
    const tx = await tokenContract.transfer(recipient, parseEther(amount));
    await tx.wait();
    alert("Transfer successful");
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
