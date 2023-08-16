const {ethers} = require("hardhat");

const socketProvider = new ethers.providers.WebSocketProvider("wss://goerli.infura.io/ws/v3/8cf1a800b0b14c89bcacad7171eeac97");

async function main() {
    const signer = await socketProvider.getSigner("0xAB56766bEdB637f1ac37FE6c6574Cd05f4F4FE8F");
    const contract = await ethers.getContractAt("MyToken", "0xE32A10A01CE79407Fc76E002A14a62436B7d9E3a", signer);

    const amount = await contract.balanceOf("0xAB56766bEdB637f1ac37FE6c6574Cd05f4F4FE8F");
    console.log(amount);

    const filter = {
        address: "0xE32A10A01CE79407Fc76E002A14a62436B7d9E3a",
        topics: []
    }

    //监听
    socketProvider.on(filter, async (args) => {
        console.log(args);
    })

    const blockNum = await socketProvider.getBlockNumber();

    const logFilter = {
        address: "0xE32A10A01CE79407Fc76E002A14a62436B7d9E3a",
        fromBlock: 0,
        toBlock: blockNum

    }
    //查询链上指定的事件
    // socketProvider.getLogs(logFilter).then(value => {
    //     console.log(value);
    // })

    //监听链上pending数据
    socketProvider.on("pending",async(tx) =>{
        console.log(tx);
        const txDetail = await socketProvider.getTransaction(tx);
        console.log(txDetail);
    });


};
main();