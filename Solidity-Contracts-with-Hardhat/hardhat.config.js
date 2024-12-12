require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
    solidity: "0.8.28",
    networks: {
        polygon_amoy: {
            url: process.env.RPC_URL, // Alchemy URL
            accounts: [process.env.PRIVATE_KEY] // Wallet private key
        }
    },
    etherscan: {
        apiKey: "NR58P93N6W7TJ1JFVAT24VX3WYIIYW2MRP" // Get this from PolygonScan
    },
};
