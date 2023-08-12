const { ethers } = require("hardhat");


async function main(){

    //部署合约
    // const Greeter = await ethers.getContractFactory("Greeter");
    // const greeter = await Greeter.deploy("Hello, Hardhat!");
    // //等待链上合约部署结束
    // await greeter.deployed();
    // //0xeAbC771f1faBB4F703256c6C006c49c1f24f2246
    // console.log(greeter.address);

    //创建一个合约对象和合约进行交互  第三个参数可以传signer
    const myContract = await ethers.getContractAt("Greeter","0xeAbC771f1faBB4F703256c6C006c49c1f24f2246");
    const greeting = await myContract.setGreeting("Hola, mundo!");
    await greeting.wait();
    // console.log("Address",myContract.address,"Greeter",await myContract.greet());

    const provider = myContract.provider;
    // console.log("获取连接节点  provider",provider.connection);
    // console.log("获取连接钱包  address", myContract.signer.address);

    //获取指定的event事件,然后查询所有的该事件信息
    let eventFilter = myContract.filters.Event1();
    const events = await myContract.queryFilter(eventFilter);
    // console.log(events);

    //监听Event1事件
    // myContract.on('Event1', (str) => {
    //     console.log('#Event1',str);
    // });

    //获取事件数
    // console.log("listenerCount",myContract.listenerCount());

    //调用方法，不用functions效果是一样的
    const newVar = await myContract.functions.greet();
    // console.log(newVar);
    // console.log(await myContract.greet());


    //查看该方法使用gas
    const resultForEstimateGas = await myContract.estimateGas.setGreeting("test");
    // console.log(ethers.utils.formatEther(resultForEstimateGas));


    const resultPopulateTransaction = await myContract.populateTransaction.setGreeting("test");
    // console.log("resultPopulateTransaction",resultPopulateTransaction);

    const call = await myContract.callStatic.greet();
    console.log(call);





}

main();