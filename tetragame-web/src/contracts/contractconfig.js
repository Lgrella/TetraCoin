import { ethers } from "ethers";
import contractABI from "./TetraCoinGame.json";
import coincontractABI from "./TetraCoin.json";
import { AMOY_RPC_URL, CONTRACT_ADDRESS, TETRACOIN_CONTRACT_ADDRESS } from "../config";

export async function getContract() {
    try {
        let provider;
        let signer;

        if (window.ethereum) {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
        } else {
            provider = new ethers.providers.JsonRpcProvider(AMOY_RPC_URL);
        }

        const mainContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer || provider);
        const tetraCoinContract = new ethers.Contract(TETRACOIN_CONTRACT_ADDRESS, coincontractABI, signer || provider);

        // Debug logs
        console.log("Main Contract:", mainContract);
        console.log("TetraCoin Contract:", tetraCoinContract);

        return [mainContract, tetraCoinContract];
    } catch (error) {
        console.error("Error loading contracts:", error);
        return [null, null];
    }
}

