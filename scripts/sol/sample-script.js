
const hardhat = require("hardhat");

async function main(){

    //获取所有钱包
    const accounts = await hardhat.ethers.getSigners();
    console.log("----------------");
    for (const account of accounts){
        console.log(account.address);
    }
    console.log("----------------");

    const accounts1 = await hardhat.web3.eth.getAccounts();

    console.log(accounts1);

}
main();