// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Donation {
    
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    struct Donor {
        uint256 numPayments;
        uint256 paymentsSum;
        uint256[] payments;
    }

    mapping (address => Donor) public donors;
    address[] public donorsAddresses;

    event Donate(address sender, uint256 amount);

    function donate() external payable {
        uint256 newPaymentNum = donors[msg.sender].numPayments;
        donors[msg.sender].numPayments++;

        donors[msg.sender].payments.push(msg.value);
        donors[msg.sender].paymentsSum += msg.value;
        if (newPaymentNum == 0) {
            donorsAddresses.push(msg.sender);
        }

        emit Donate(msg.sender, msg.value);
    }

    function withdraw(address payable recipient, uint256 amount) external OnlyOwner Valid(amount) {
        recipient.transfer(amount);
    }

    function getDonors() external view returns(address[] memory) {
        return donorsAddresses;
    }

    function getPaymentsSum(address donor) external view returns(uint256) {
        return donors[donor].paymentsSum;
    }

    function getOwner() external view returns(address) {
        return owner;
    }

    modifier Valid(uint256 amount) {
        require(amount <= address(this).balance, "Withdrawal amount exceeds balance.");
        _;
    }

    modifier OnlyOwner() {
        require(owner == msg.sender, "You are not an owner.");
        _;
    }
}