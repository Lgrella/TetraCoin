async function main() {
    // Replace with the actual deployed TetraCoin address
    const tetraCoinAddress = "0x200efcD1845991401bDB7832afb8c1a3006F03b1";

    console.log("Deploying TetraCoinGame contract...");
    
    const TetraCoinGame = await ethers.getContractFactory("TetraCoinGame");
    const game = await TetraCoinGame.deploy(tetraCoinAddress);

    await game.deployed();

    console.log("TetraCoinGame deployed to:", game.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
