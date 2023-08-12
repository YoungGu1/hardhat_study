const {ethers} = require("hardhat");

async function main(){

    //使用第二个地址部署合约
    const [one,two] = await ethers.getSigners();
    // const contractFactory = await ethers.getContractFactory("Greeter");
    // const deploy = await contractFactory.connect(two).deploy("hello goerli");
    // await deploy.deployed();
    // //0xA8cA42B1E71856954b864aBB1F8D78E22900B150
    // console.log(deploy.address);

    const contract = await ethers.getContractAt("Greeter","0xA8cA42B1E71856954b864aBB1F8D78E22900B150",one);
    // console.log(await contract.greet());
    const newVar = await contract.setGreeting("modify greeter");
    //等待交易确认
    await newVar.wait();
    console.log(await contract.greet());


};
main();