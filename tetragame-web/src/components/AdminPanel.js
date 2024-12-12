import React, { useState,useEffect } from "react";
import { getContract } from "../contracts/contractconfig";
import { ethers } from "ethers";

const AdminPanel = () => {
    const [scores, setScores] = useState([]);
    const [highestScorer, setHighestScorer] = useState("");
    const [highestScore, setHighestScore] = useState(0);
    const [rewardAmount, setRewardAmount] = useState("");

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const [mainContract] = await getContract();
                if (!mainContract) {
                    console.error("Main contract not loaded correctly");
                    return;
                }

                // Fetch the highest scorer and their score
                const highestScorer = await mainContract.highestScorer();
                const highestScore = await mainContract.highestScore();
                setHighestScorer(highestScorer);
                setHighestScore(highestScore.toString());

                // Fetch all scores (example if your contract supports this via mapping or events)
                // If not supported, display only the highest scorer
                const players = []; // You can fetch the list of players in other ways if supported
                const playerScores = await Promise.all(
                    players.map(async (player) => ({
                        player,
                        score: (await mainContract.getScore(player)).toString(),
                    }))
                );
                setScores(playerScores);
            } catch (error) {
                console.error("Error fetching scores:", error);
            }
        };

        fetchScores();
    }, []);

    const handleAward = async () => {
        try {
            const [, tetraCoinContract] = await getContract();
            if (!tetraCoinContract) {
                console.error("TetraCoin contract not loaded correctly");
                return;
            }

            // Ensure rewardAmount is a valid number
            if (!rewardAmount || isNaN(rewardAmount)) {
                alert("Please enter a valid reward amount.");
                return;
            }

            // Award the highest scorer
            const rewardInWei = ethers.utils.parseUnits(rewardAmount, 18);
            const tx = await tetraCoinContract.transfer(highestScorer, rewardInWei);
            await tx.wait();

            alert(`Successfully awarded ${rewardAmount} TetraCoin to ${highestScorer}!`);
        } catch (error) {
            console.error("Error awarding TetraCoin:", error);
        }
    };

    return (
        <div>
            <h2>Admin Panel</h2>

            {/* Scoreboard */}
            <h3>Scoreboard</h3>
            {scores.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.player}</td>
                                <td>{entry.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No scores available yet.</p>
            )}

            {/* Highest Scorer */}
            <h3>Highest Scorer</h3>
            <p>
                <strong>Player:</strong> {highestScorer || "N/A"}
            </p>
            <p>
                <strong>Score:</strong> {highestScore || "N/A"}
            </p>

            {/* Reward Input */}
            <h3>Award TetraCoin</h3>
            <input
                type="number"
                placeholder="Reward Amount"
                value={rewardAmount}
                onChange={(e) => setRewardAmount(e.target.value)}
            />
            <button onClick={handleAward}>Award TetraCoin</button>
        </div>
    );
};

export default AdminPanel;


// const AdminPanel = () => {
//     const awardFunds = async () => {
//         const contract = await getContract()[0];
//         const rewardAmount = ethers.utils.parseUnits("100", 18); // Reward 100 TetraCoin
//         try {
//             const tx = await contract.awardWinner(rewardAmount);
//             await tx.wait();
//             alert("Funds awarded successfully!");
//         } catch (error) {
//             console.error("Error awarding funds:", error);
//         }
//     };

//     return (
//         <div>
//             <button onClick={awardFunds}>Administer Funds</button>
//         </div>
//     );
// };

// export default AdminPanel;
