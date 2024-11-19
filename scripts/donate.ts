import { ethers } from 'hardhat';
const getContract_donate = require('./get_contract.ts');

async function donate() {
    const contract = await getContract_donate();

    const ETHERS_TO_SEND = "0.001";

    try {
        const amountToSend = ethers.parseEther(ETHERS_TO_SEND);
        console.log(`Sending ${amountToSend.toString()} wei to ${contract.contractAddress}...`);

        const tx = await contract.donate({
            value: amountToSend,
        });

        await tx.wait();
        console.log(`Transaction finished: ${tx.hash}`);
    } catch (error) {
        console.error(`Error sending transaction: ${error}`);
    }

}

donate()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });