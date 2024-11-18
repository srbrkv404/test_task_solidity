require('dotenv').config();
const { ethers } = require('hardhat');

async function main() {
    const contractAddress = '0x3A569c1260404Cb919FA69BFFF7749F688D688B1';
    const contractABI = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "message",
              "type": "string"
            }
          ],
          "name": "Donate",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "message",
              "type": "string"
            }
          ],
          "name": "donate",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "donors",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "numPayments",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "paymentsSum",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "donorsAddresses",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getDonors",
          "outputs": [
            {
              "internalType": "address[]",
              "name": "",
              "type": "address[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getOwner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "donor",
              "type": "address"
            }
          ],
          "name": "getPaymentsSum",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address payable",
              "name": "recipient",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
    ];

    const [deployer] = await ethers.getSigners();
    
    const contract = new ethers.Contract(contractAddress, contractABI, deployer);

    try {
        const amountToSend = ethers.parseEther("0.001");
        console.log(`Sending ${amountToSend.toString()} wei to ${contractAddress}...`);

        const tx = await contract.donate("test", {
            value: amountToSend,
        });

        await tx.wait();
        console.log(`Transaction finished: ${tx.hash}`);
    } catch (error) {
        console.error(`Error sending transaction: ${error}`);
    }

    try {
            const wd = await contract.withdraw("0xECC439B14da600Eaae256971F1583F78ef89955C", ethers.parseEther("0.0025"));
            await wd.wait();
            console.log(`Successful withdrawal: ${wd.hash}`);
    } catch (error) {
            console.error(`Error with withdraw: ${error}`);
    }

    try {
            const result = await contract.getBalance();
            console.log(`Current balance: ${result}`);
    } catch (error) {
            console.error(`Error with getBalance: ${error}`);
    }

    try {
        const donors = await contract.getDonors();
        console.log(`Donors: ${donors}`);
    } catch (error) {
        console.error(`Error with getDonors: ${error}`);
    }

    try {
        const paymentsSum = await contract.getPaymentsSum("0xECC439B14da600Eaae256971F1583F78ef89955C");
        console.log(`Total payments sum of ${"0xECC439B14da600Eaae256971F1583F78ef89955C"}: ${paymentsSum}`);
    } catch (error) {
        console.error(`Error with getDonors: ${error}`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });