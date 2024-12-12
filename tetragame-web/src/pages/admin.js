import React, { useEffect, useState } from "react";
import WalletProvider from "../components/WalletProvider";
import AdminPanel from "../components/AdminPanel";
import { getContract } from "../contracts/contractconfig";

const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                // Fetch the main contract from getContract
                const [contract] = await getContract();
                if (!contract) {
                    console.error("Contract not loaded correctly");
                    return;
                }

                // Get the contract owner address
                const owner = await contract.owner();
                console.log("Contract Owner:", owner);

                // Get the currently connected wallet address
                const accounts = await window.ethereum.request({ method: "eth_accounts" });
                if (accounts.length === 0) {
                    console.error("No accounts found. Please connect your wallet.");
                    return;
                }
                const [currentAccount] = accounts;
                console.log("Connected Account:", currentAccount);

                // Check if the connected wallet is the owner
                setIsAdmin(currentAccount.toLowerCase() === owner.toLowerCase());
            } catch (error) {
                console.error("Error checking admin status:", error);
            }
        };

        checkAdmin();
    }, []);

    return (
        <div>
            <h1>Admin Panel</h1>
            <WalletProvider />
            {isAdmin ? (
                <AdminPanel />
            ) : (
                <p>You do not have the necessary permissions to access this page.</p>
            )}
        </div>
    );
};

export default Admin;
