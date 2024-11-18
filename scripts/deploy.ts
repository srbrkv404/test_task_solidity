const hre = require("hardhat");

async function main_() {
    const Donation = await hre.ethers.getContractFactory("Donation");
    const donation = await Donation.deploy();
    await donation.waitForDeployment();

    console.log("Donation:", donation.address);
}

main_().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});