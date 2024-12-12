async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);

    const TetraCoin = await ethers.getContractFactory("TetraCoin");
    const tetraCoin = await TetraCoin.deploy();

    console.log("TetraCoin deployed to:", tetraCoin.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
