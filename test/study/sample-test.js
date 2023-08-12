// const { expect } = require("chai");
// const { ethers } = require("hardhat");
//
//
// describe("Ethers", function () {
//
//     it("For localhost JsonRpcProvider ", async function () {
//         const provider = new ethers.providers.JsonRpcProvider();
//         //const provider = new ethers.providers.JsonRpcProvider("http://localhost:9545");
//         //获取 connect
//         const connection = provider.connection;
//         console.log("connection",connection);
//
//         // for signer
//         const signer = await provider.getSigner("0x62915562be97f2e5bf057a460E04614f51cf94B1");
//         console.log("signer",signer);
//
//         // for signer address
//         const signerAddress = await signer.getAddress();
//         console.log("signerAddress",signerAddress);
//
//         // for uncheck signer
//         const unCheckedSigner = await provider.getUncheckedSigner("0x62915562be97f2e5bf057a460E04614f51cf94B1");
//         // for uncheck signer address
//         const unSignerAddress = await unCheckedSigner.getAddress();
//         console.log("unSignerAddress",unSignerAddress);
//
//         // for accountlist
//         const accounts = await provider.listAccounts();
//         console.log("accounts",accounts);
//
//         // for provider send method
//         const arrayAccounts = ["0x62915562be97f2e5bf057a460E04614f51cf94B1"];
//         const accoutsBalance = await provider.send("eth_getBalance",arrayAccounts);
//         console.log("accoutsBalance",ethers.utils.formatEther(accoutsBalance));
//
//     });
// });
