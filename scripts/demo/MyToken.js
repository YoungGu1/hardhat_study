const {ethers} = require("hardhat");
const {Contract} = require("hardhat/internal/hardhat-network/stack-traces/model");

async function main() {

    //创建合约，默认是用第一个账号创建
    // const factory = await ethers.getContractFactory("MyToken");
    // const contract = await factory.deploy();
    // await contract.deployed();
    //0x20b8a89311cc716c128e97742bd03394D7B836E2
    // console.log("创建合约   ",contract.address);

    const [one, two, three] = await ethers.getSigners();

    //与合约进行交互
    const oneContract = await ethers.getContractAt("MyToken", "0x20b8a89311cc716c128e97742bd03394D7B836E2", one);

    //获取地址1.2的余额
    const oneBalanceOf = await oneContract.balanceOf(one.address);
    const twoBalanceOf = await oneContract.balanceOf(two.address);
    // console.log("oneBalanceOf:",oneBalanceOf);
    // console.log("twoBalanceOf:",twoBalanceOf);

    //转账
    const transfer = await oneContract.transfer(two.address, ethers.utils.parseEther("1000"));
    // await transfer.wait();
    // console.log(transfer);
    // console.log("oneBalanceOf:", oneBalanceOf);
    // console.log("twoBalanceOf:", twoBalanceOf);

    //过滤事件Transfer
    const blockNumber = await ethers.provider.getBlockNumber();
    const events = await oneContract.queryFilter("Transfer", 0, blockNumber);
    // console.log(events);

    //监听日志
    oneContract.on("Transfer", (from, to, amount, event) => {
        console.log(`from: ${from} | to: ${to} | amount: ${amount} | event: ${event}`);
        console.log(event);
    });


}

main();