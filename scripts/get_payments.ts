const getContract_payments = require('./get_contract.ts');

async function getPaymentsSum() {
    const contract = await getContract_payments();

    const RECIPIENT = "0xECC439B14da600Eaae256971F1583F78ef89955C";

    try {
        const paymentsSum = await contract.getPaymentsSum(RECIPIENT);
        console.log(`Total payments sum of ${RECIPIENT}: ${paymentsSum}`);
    } catch (error) {
        console.error(`Error with getPaymentsSum: ${error}`);
    }
}

getPaymentsSum()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
