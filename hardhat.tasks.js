require("@nomiclabs/hardhat-web3");

/**
 * hre上下文里面已经有了ethers对象
 *
 */
//创建自己的任务
task("accounts-ethers", "Prints ethers accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
    for (const account of accounts) {
        console.log(account.address);
    }
});

task("accounts-web3", "Prints web3 accounts", async (_, { web3 }) => {
    console.log(await web3.eth.getAccounts());
});

task("balance", "Prints an account's balance")
    .addParam("account", "The account's address")
    .setAction(async (taskArgs) => {
        const account = web3.utils.toChecksumAddress(taskArgs.account);
        const balance = await web3.eth.getBalance(account);

        console.log(account,web3.utils.fromWei(balance, "ether"), "ETH");
    });


