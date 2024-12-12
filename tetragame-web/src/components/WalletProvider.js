import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getContract } from "../contracts/contractconfig";

const WalletProvider = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [networkName, setNetworkName] = useState("");
    const ADMIN_ADDRESS = "0x75fd6F495e8d2cef53d00532FaD63E1EBE872499"; // Replace with your admin wallet address

    const isAdmin = walletAddress.toLowerCase() === ADMIN_ADDRESS.toLowerCase();

    const [balance, setBalance] = useState("0");

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                setWalletAddress(accounts[0]);

                // Get the network chain ID
                const chainId = await window.ethereum.request({ method: "eth_chainId" });

                const network = getNetworkName(chainId);
                setNetworkName(network);

                // Fetch TetraCoin balance
                await fetchBalance(accounts[0]);
            } catch (error) {
                console.error("Connection error:", error);
            }
        } else {
            alert("MetaMask not detected!");
        }
    };

    const fetchBalance = async (address) => {
        try {
            const [, tetraCoinContract] = await getContract(); // Destructure only the second contract
            if (!tetraCoinContract) {
                console.error("TetraCoin Contract not loaded correctly");
                return;
            }
    
            // Debug log
            console.log("TetraCoin Contract Instance:", tetraCoinContract);
    
            const balance = await tetraCoinContract.balanceOf(address);
            setBalance(ethers.utils.formatUnits(balance, 18));
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    const getNetworkName = (chainId) => {
        switch (chainId) {
            case "0x13881": // Polygon Mumbai Testnet
                return "Polygon Mumbai Testnet";
            case "0x13882": // Polygon Amoy Testnet
                return "Polygon Amoy Testnet";
            default:
                return "Unknown Network";
        }
    };

    return (
        <div>
            {walletAddress ? (
                <div>
                    <p>Connected Address: {walletAddress}</p>
                    <p>Network: {networkName}</p>
                    <p>TetraCoin Balance: {balance}</p>
                    {isAdmin && <p>You are the admin account.</p>}
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletProvider;
