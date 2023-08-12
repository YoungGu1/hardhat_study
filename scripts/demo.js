const hre = require("hardhat");
const ethers = hre.ethers;

async function main(){
    const balance = await ethers.provider.getBalance("0xba0bAc1569b1A44F014d040191B50a94305fc39c");
    console.log(await ethers.utils.formatEther(balance));
}
main();