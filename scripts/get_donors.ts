const getContract_donors = require('./get_contract.ts');

async function getDonors() {
    const contract = await getContract_donors();

    try {
        const donors = await contract.getDonors();
        console.log(`Donors: ${donors}`);
    } catch (error) {
        console.error(`Error with getDonors: ${error}`);
    }
}

getDonors()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });