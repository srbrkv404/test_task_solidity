contract address "0xcdbF4d3ADDe901F6dee8fca3B60be8cEAD62b8b5"

Necessary to instal:

    "npm"
    "hardhat"
    "@nomicfoundation/hardhat-toolbox"
    "@nomiclabs/hardhat-etherscan"
    "@openzeppelin/contracts"
    "dotenv"
    "chai"

Before deploy create file .env with following content:

    NETWORK="sepolia"
    INFURA_URL="https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY"
    PRIVATE_KEY="YOUR_PRIVATE_KEY"
    ETHERSCAN_API="YOUR_ETHERSCAN_API_KEY"

Commands:

    "npx hardhat compile" -- to compile contracts/Donation.sol
    "npx hardhat coverage" -- to test contract using test/Donation.test.ts with testing coverage
    "npx hardhat run scripts/deploy.ts --network sepolia" -- to deploy contract to the sepolia testnet
    "npx hardhat run scripts/donate.ts --network sepolia" -- to run script of fucntion donate
    "npx hardhat run scripts/withdraw.ts --network sepolia" -- to run script of fucntion withdraw
    "npx hardhat run scripts/get_donors.ts --network sepolia" -- to run script of fucntion get_donors
    "npx hardhat run scripts/get_payments.ts --network sepolia" -- to run script of fucntion get_payments
