const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Ethers", function () {

    it('should signature', async function () {

        console.log(await ethers.provider);
        //获取默认的钱包
        // const defaultSigner = await ethers.provider.getSigner();
        //获取所有的钱包
        const [one,two] = await ethers.getSigners();
        console.log("第一个钱包地址    ：",one.address+"   第一个钱包金额：",await ethers.provider.getBalance(one.address));
        console.log("第二个钱包地址    : ",two.address+"   第二个钱包金额：",await ethers.provider.getBalance(two.address));

        const gasPrice = await one.getGasPrice();
        console.log("获取gas    ：", ethers.utils.formatEther(gasPrice));

        //开始转账
        const price = ethers.utils.parseEther('1');
        console.log("开始转账-------------");
        //构建转账交易
        const tx = {
            to: two.address,
            value: price,
        };
        const transactionResponse = await one.sendTransaction(tx);
        console.log("转账结束-------------")
        console.log("第一个钱包地址    ：",one.address+"   第一个钱包金额：",await ethers.provider.getBalance(one.address));
        console.log("第二个钱包地址    : ",two.address+"   第二个钱包金额：",await ethers.provider.getBalance(two.address));
        console.log("transaction:",transactionResponse);

    });

});
