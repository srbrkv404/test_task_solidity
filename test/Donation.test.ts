import { loadFixture, ethers, expect } from "./setup";

describe("Donation", function() {
    async function deploy() {
        const [acc1, acc2] = await ethers.getSigners();

        const Factory = await ethers.getContractFactory("Donation");
        const donation = await Factory.deploy();
        await donation.waitForDeployment();
        
        return { acc1, acc2, donation }
    }

    describe("Donations funcs", function() {
        it("Should allow users to donate", async function () {
            const {acc1, acc2, donation} = await loadFixture(deploy);

            await donation.connect(acc2).donate({value : ethers.parseEther("1.0")});
            await donation.connect(acc2).donate({value : ethers.parseEther("2.0")});

            const totalDonations = await donation.getPaymentsSum(acc2.address);

            expect(totalDonations).to.equal(ethers.parseEther("3.0"));
        });

        it("Should store unique donors", async function () {
            const {acc1, acc2, donation} = await loadFixture(deploy);
            await donation.connect(acc1).donate({ value: ethers.parseEther("1.0") });
            await donation.connect(acc2).donate({ value: ethers.parseEther("2.0") });

            const donors = await donation.getDonors();
            expect(donors).to.include(acc1.address);
            expect(donors).to.include(acc2.address);
            expect(donors.length).to.equal(2);
        });

        it("Should allow the owner to withdraw funds", async function () {
            const {acc1, acc2, donation} = await loadFixture(deploy);

            const donationAmount = ethers.parseEther("1.0");
            await donation.connect(acc1).donate({ value: donationAmount });

            const initialBalance = await ethers.provider.getBalance(donation.getOwner());
            await donation.withdraw(donation.getOwner(), donationAmount);

            const finalBalance = await ethers.provider.getBalance(donation.getOwner());
            expect(finalBalance).to.be.gt(initialBalance);
        });


        it("Should return total sum of donates", async function() {
            const {acc1, acc2, donation} = await loadFixture(deploy);

            await donation.connect(acc2).donate({ value: ethers.parseEther("1.0") });
            await donation.connect(acc2).donate({ value: ethers.parseEther("2.0") });

            const sum = await donation.getPaymentsSum(acc2.address);
            expect(sum).to.equal(BigInt(ethers.parseEther("3.0")));
        });
    });

    describe("Safety", function() {
        it("Should be deployed", async function() {
            const { donation } = await loadFixture(deploy);

            expect(donation.target).to.be.properAddress;
        });

        it("Should not allow non-owners to withdraw funds", async function () {
            const {acc1, acc2, donation} = await loadFixture(deploy);

            await donation.connect(acc2).donate({ value: ethers.parseEther("1.0") });

            await expect(
                donation.connect(acc2).withdraw(acc1.address, ethers.parseEther("1.0"))
            ).to.be.revertedWith("You are not an owner.");
        });

        it("Should not allow withdrawals greater than the contract balance", async function () {
            const {acc1, acc2, donation} = await loadFixture(deploy);
            await donation.connect(acc1).donate({ value: ethers.parseEther("1.0") });

            await expect(
                donation.withdraw(acc2.address, ethers.parseEther("2.0"))
            ).to.be.revertedWith("Withdrawal amount exceeds balance.");
        });
    });
});