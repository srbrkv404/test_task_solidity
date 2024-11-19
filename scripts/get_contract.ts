import { ethers } from 'hardhat';
const hre = require("hardhat");

async function getContract() {
    const contractAddress = '0xcdbF4d3ADDe901F6dee8fca3B60be8cEAD62b8b5';
    const MyContract = await hre.artifacts.readArtifact("Donation");
    const contractABI = MyContract.abi;
    const [deployer] = await ethers.getSigners();
    return new ethers.Contract(contractAddress, contractABI, deployer);
}

module.exports = getContract;