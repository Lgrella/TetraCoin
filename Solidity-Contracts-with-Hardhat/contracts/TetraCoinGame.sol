// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TetraCoinGame {
    address public owner;
    IERC20 public tetraCoin;
    address public highestScorer;
    uint256 public highestScore;

    mapping(address => uint256) public scores;

    event ScoreSubmitted(address indexed player, uint256 score);
    event WinnerAwarded(address indexed winner, uint256 rewardAmount);

    constructor(address _tetraCoinAddress) {
        owner = msg.sender;
        tetraCoin = IERC20(_tetraCoinAddress);
    }

    function submitScore(uint256 _score) public {
        require(_score > 0, "Score must be positive");

        // Record the score
        scores[msg.sender] = _score;

        // Update the highest score
        if (_score > highestScore) {
            highestScore = _score;
            highestScorer = msg.sender;
        }

        emit ScoreSubmitted(msg.sender, _score);
    }

    function awardWinner(uint256 rewardAmount) public {
        require(msg.sender == owner, "Only owner can award the winner");
        require(highestScorer != address(0), "No scores submitted");
        require(tetraCoin.balanceOf(address(this)) >= rewardAmount, "Insufficient TetraCoin balance");

        // Transfer tokens to the highest scorer
        tetraCoin.transfer(highestScorer, rewardAmount);

        emit WinnerAwarded(highestScorer, rewardAmount);

        // Reset the game
        highestScorer = address(0);
        highestScore = 0;
    }

    function getScore(address player) public view returns (uint256) {
        return scores[player];
    }
}
