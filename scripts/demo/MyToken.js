const {ethers} = require("hardhat");
const {Contract} = require("hardhat/internal/hardhat-network/stack-traces/model");

const abiMyTokenRouter = require('../../artifacts/contracts/MyToken.sol/MyToken.json').abi;

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

async function test(){
    const iface = new ethers.utils.Interface(abiMyTokenRouter);

    //编码
    const encode = iface.encodeFunctionData("transfer",["0xba0bAc1569b1A44F014d040191B50a94305fc39c",100]);
    //Decode Function Data
    console.log("Decode Function Data ->", iface.decodeFunctionData("transfer",encode));

    //解码
    const data = "0x000000000000000000000000000000000000000000000000000813fd9896e211";
    const topics = [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "0x000000000000000000000000f4b41959885793df7fc6f1945af317a6e0b30011",
        "0x000000000000000000000000da3da3f3f2bc01a91edc8d6c501ad5b557d1acc3"
    ];
    iface.parseLog({ data, topics });
    console.log("Parse Log Data->", iface.parseLog({ data, topics }));



}

test();
// main();