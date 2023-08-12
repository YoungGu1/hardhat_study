const { ethers } = require("hardhat");


async function main(){

    //部署合约
    // const Greeter = await ethers.getContractFactory("Greeter");
    // const greeter = await Greeter.deploy("Hello, Hardhat!");
    // //等待链上合约部署结束
    // await greeter.deployed();
    // //0xeAbC771f1faBB4F703256c6C006c49c1f24f2246
    // console.log(greeter.address);

    //创建一个合约对象和合约进行交互
    const myContract = await ethers.getContractAt("Greeter","0xeAbC771f1faBB4F703256c6C006c49c1f24f2246");
    const greeting = await myContract.setGreeting("Hola, mundo!");
    await greeting.wait();
    console.log("Address",myContract.address,"Greeter",await myContract.greet());



}

main();