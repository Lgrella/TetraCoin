# Exploring Smart Contracts and ERC-20 Tokens With Tetris

## TetraCoin Tetris Game

A decentralized application (dApp) that combines the fun of Tetris with blockchain technology. Players can play Tetris, submit their scores to a smart contract, and the highest-scoring player can be rewarded with ERC-20 tokens (TetraCoin). This project runs on Polygon's testnet and uses MetaMask for wallet interactions.

### Features

1. Play Tetris:
    * Users can play a fully functional Tetris game in their browser.
2. Blockchain Integration:
    * Scores are submitted to a smart contract deployed on the Polygon testnet.
    * High scores are stored and can be viewed on the admin panel.
3. ERC-20 Token Reward System:
    * Admin can reward the highest-scoring player with TetraCoin tokens directly from the smart contract.
4. MetaMask Wallet Connection:
    * Players can connect their wallet and interact with the smart contract seamlessly.
    * Displays the wallet's current TetraCoin balance and network details.

### Technologies

1. Frontend:
    * React.js
    * Styled Components for styling
    * React Tetris library for game functionality
2. Backend:
    * Solidity for smart contract development
    * OpenZeppelin ERC-20 library
3. Blockchain:
    * Polygon Amoy Testnet
    * MetaMask for wallet connection
    * ethers.js for blockchain interactions
4. Development Tools:
    * Hardhat for compiling, deploying, and testing smart contracts
    * Alchemy for RPC provider

### Installation and Using this Project

1. Install the following requirements
    * node.js
    * Metamask Browser Extension

2. Clone the Repository

    ```bash
    git clone https://github.com/yourusername/tetracoin-tetris-game.git
    cd tetracoin-tetris-game
    ```

3. Install Dependencies

    ```bash
    npm install
    ```

4. Configure Environment

    * Create a .env file and paste in associated keys and addresses. Replace placeholders below with your actual RPC URL, private key, and deployed contract addresses.

    ```bash
    AMOY_RPC_URL=YOUR_POLYGON_AMOY_RPC_URL
    PRIVATE_KEY=YOUR_METAMASK_PRIVATE_KEY
    CONTRACT_ADDRESS=DEPLOYED_CONTRACT_ADDRESS
    TETRACOIN_CONTRACT_ADDRESS=DEPLOYED_TETRACOIN_CONTRACT_ADDRESS
    ```

## Smart Contracts

### TetraCoinGame.sol

Contract Address: 0x90722556aae445F5156eEb2c4Eb34864c36f3B53

This contract handles:

1. Storing scores for players.
2. Keeping track of the highest scorer.
3. Allowing the admin to reward the highest-scoring player with TetraCoin.

Functions:

* submitScore(uint256 _score) - Submits a player's score.
* awardWinner(uint256 rewardAmount) - Awards the highest scorer with TetraCoin.
* getScore(address player) - Fetches the score for a specific player.

Usage:

1. Start the development server
2. Open Application in the server
3. Click Connect wallet to connect to your Metamask Wallet
4. Confirm you are connected to Polygon Amoy Testnet
5. Play Tetris and receive a high score
6. Click "Submit" After game ends to submit your score. This will save it on the blockchain by calling the `submitScore` function.
7. Admin can navigate to /admin to view the scoreboard and award TetraCoin to the highest scorer.

## TetraCoin.sol

Contract Address: 0x200efcD1845991401bDB7832afb8c1a3006F03b1

This contract handles:

1. Minting the TetraCoin
2. Providing transfer functions allowing movement of the TetraCoin from owner of contract to others

Usage:

1. By navigating to the Admin page, the owner of the account can transfer TetraCoin to the highest scoring player

The app developer can either call the `Transfer` function directly from Tetracoin contract, or they ca ncall the `awardWinner` function from TetraCoinGame (this is preferred as it allows for additional actions to occur on transfer)

### Deploying the Contracts

To deploy the two contracts, I followed these steps:

1. **Compile the Contracts**: Ensure that the contracts are compiled using the Solidity compiler. This was done with Hardhat.

2. **Set Up Deployment Script**: Create a deployment script that specifies the contracts to be deployed and any constructor parameters they require.

3. **Configure Network Settings**: Update the network configuration in Hardhat to include the target network (e.g., Polygon Amoy). Ensure you have the necessary credentials and API keys.

4. **Deploy the Contracts**: I ran the following commands in the terminal to deploy both of my contracts

    ```bash
     #Installation
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
     nvm install 22
     npm install --save-dev hardhat
     npm install @openzeppelin/contracts
     npx hardhat
     npm install --save-dev @nomiclabs/hardhat-ethers ethers
     npm install dotenv
     npx hardhat run scripts/deploy.js --network polygon_amoy #change the deploy script name to be the one of the contract of interest 
    ```

    This command deploys the contracts to the specified network.

5. **Verify Deployment**: After deployment, verify the contracts on Etherscan or a similar block explorer. This step often involves submitting the contract source code and ABI for verification.

6. **Update Frontend**: Once the contracts are deployed, update your frontend application with the new contract addresses and ABI definitions. This ensures that your application interacts with the correct contract instances.

## Front End Set-Up

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Tools

1. Framework: React.js
2. Blockchain Libraries: ethers.js, web3.js

### Dependencies

```bash
npx create-react-app tetragame-web
cd tetragame-web
npm install ethers react-toastify
```

## Screenshots of Deployment, PolygonScan and Application in Progress

### Deployment and Verification of Smart Contracts

![2deployTetraCoinGame](/imgs/2deployTetraCoinGame.png)
![3verifyTetraCoinGame](/imgs/3verifyTetraCoinGame.png)
![4verifyTetraCoin](/imgs/4verifyTetraCoin.png)

### View of Smart Contracts on PolyScan

![1tokencontract_orgin](/imgs/1tokencontract_orgin.png)
![5tokencontract_afterverify](/imgs/5tokencontract_afterverify.png)
![7submitscoretrans](/imgs/7submitscoretrans.png)
![8tetracoinAfterTransfering](/imgs/8tetracoinAfterTransfering.png)
![9TetraCoinOwnerAcct](/imgs/9TetraCoinOwnerAcct.png)
![10OwnerAcctCoinOnly](/imgs/10OwnerAcctCoinOnly.png)

### Getting API Keys to Connect App to Amoy TestNet

![11AlchemyAPI](/imgs/11AlchemyAPI.png)
![12PolygonAPIkey](/imgs/12PolygonAPIkey.png)

### Successful Compilation of App and Console Testing that App Connects to Contracts

![13successfulcompiling](/imgs/13successfulcompiling.png)
![14javascriptconsole](/imgs/14javascriptconsole.png)

### Application Opening Scene

![15appopeningscene](/imgs/15appopeningscene.png)

### Logging in as User or as TetraCoin Owner

![16LoggingIn_wallet](/imgs/16LoggingIn_wallet.png)
![17LoggingIn_wallet_owner](/imgs/17LoggingIn_wallet_owner.png)

### Admin Screen under different kinds of Accounts

![18adminScreen](/imgs/18adminScreen.png)
![26AdminScreenNotAllowedForNonOwner](/imgs/26AdminScreenNotAllowedForNonOwner.png)

### Transfer TetraCoin from Owner to User

![19ClickingTransfer](/imgs/19ClickingTransfer.png)
![20SuccessfullyTransferred](/imgs/20SuccessfullyTransferred.png)
![21OwnerAccount_Transfer](/imgs/21OwnerAccount_Transfer.png)
![22ReceivingAccount_Transfer](/imgs/22ReceivingAccount_Transfer.png)

### Updated TETRA balances

![23OwnerAccountTotalTetra](/imgs/23OwnerAccountTotalTetra.png)
![25UpdatedBalance](/imgs/25UpdatedBalance.png)

### Submitting Score Process

![27GameOverScreen](/imgs/27GameOverScreen.png)
![28SubmitScore](/imgs/28SubmitScore.png)
![29ScoreSubmitSuccessful](/imgs/29ScoreSubmitSuccessful.png)

## Future Improvements

* Add multiplayer support for live scoreboards.
* Automate the coin distribution process
* Enhance the Tetris gameplay experience with power-ups.
* Integrate real-time updates using WebSockets.
* Deploy on the Polygon mainnet for public access.
* Host Frontend on Netlify
