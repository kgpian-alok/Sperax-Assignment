// src/components/WalletConnection.js

import React, { useState } from "react";

const WalletConnection = ({ setWalletAddress }) => {
  const [address, setAddress] = useState("");

  const handleInputChange = (e) => {
    setAddress(e.target.value);
    setWalletAddress(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter wallet address"
        value={address}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default WalletConnection;
