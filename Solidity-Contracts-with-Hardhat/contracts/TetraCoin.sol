// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TetraCoin is ERC20 {
    constructor() ERC20("Tetracoin", "TETRA") {
        // The `Ownable` contract automatically sets msg.sender as the owner.
        _mint(msg.sender, 2_000_000 * 10 ** decimals());
    }
}