import { ethers } from 'hardhat';
const getContract_withdraw = require('./get_contract.ts');

async function withdrawFunds() {
    const contract = await getContract_withdraw();

    const RECIPIENT = "0xECC439B14da600Eaae256971F1583F78ef89955C";
    const ETHERS_TO_WITHDRAW = "0.001";

    try {
        const wd = await contract.withdraw(RECIPIENT, ethers.parseEther(ETHERS_TO_WITHDRAW));
        await wd.wait();
        console.log(`Successful withdrawal: ${wd.hash}`);
    } catch (error) {
        console.error(`Error with withdraw: ${error}`);
    }
}

withdrawFunds()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
