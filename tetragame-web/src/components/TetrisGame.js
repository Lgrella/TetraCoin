import React, { useState } from "react";
import Game from "../tetris/components/Game"; // Path to your Tetris game
import LoseGame from "../tetris/components/LoseGame"; // Path to LoseGame
import { getContract } from "../contracts/contractconfig";
import { sessionHighScore } from "../tetris/components/Game";

// Global variable to store the session high score

const TetrisGame = () => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const handleGameOver = (finalScore) => {
        console.log("in handleGameOver");
        console.log("Game Over! Final Score:", finalScore);
        setScore(finalScore);
        setGameOver(true);
    };

    const handleScoreSubmit = async () => {
        console.log("Submitting score...");
        try {
            const [contract] = await getContract();
            setScore(sessionHighScore);
            // Ensure the score is a valid number
            if (isNaN(score) || score <= 0) {
                alert("Invalid score. Please try again.");
                return;
            }

            console.log("Submitting score with value:", score);

            const tx = await contract.submitScore(score);
            console.log("Transaction submitted:", tx.hash);

            await tx.wait();
            console.log("Transaction mined:", tx.hash);

            alert("Score submitted successfully!");
            setGameOver(false);
            setScore(0);
        } catch (error) {
            console.error("Error submitting score:", error);
            alert("An error occurred while submitting your score. Please try again later.");
        }
    };

    return (
        <div>
            {/* Top Section with Session High Score and Submit Button */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <p>
                    <strong>Session High Score:</strong> {sessionHighScore}
                </p>
                <button
                    onClick={handleScoreSubmit}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        color: "#FFF",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Submit Current Score
                </button>
            </div>

            {/* Game Section */}
            {!gameOver ? (
                <Game onGameOver={handleGameOver} />
            ) : (
                <LoseGame
                    status={{ score, level: 1, lines: 10 }}
                    portrait={true}
                    pixelSize={10}
                    theme3d={false}
                    restartClick={() => {
                        setGameOver(false);
                        setScore(0);
                    }}
                />
            )}
        </div>
    );
};

export default TetrisGame;
