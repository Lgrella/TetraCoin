import React from "react";
import WalletProvider from "../components/WalletProvider";
import TetrisGame from "../components/TetrisGame";

const Home = () => {
    return (
        <div>
            <h2>Welcome to TetraCoin</h2>
            <WalletProvider />
            <TetrisGame />
        </div>
    );
};

export default Home;
