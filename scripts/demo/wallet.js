const { ethers } = require("hardhat");

async function main(){
    const privateKey = '0x18768baeb450fe098542b1659a283b3c7e652ab535af1a0635251f63157d16b8';
    //根据私钥key生成钱包对象
    const walletKey = new ethers.Wallet(privateKey);
    // console.log(walletKey);

    //随机生成钱包
    const walletRondom = new ethers.Wallet.createRandom();
    /**
     * walletRondom.address  地址
     * walletRondom.privateKey  钱包私钥
     * walletRondom.publicKey   钱包公钥
     * walletRondom.mnemonic    钱包助记词  mnemonic.phrase就是助记词的内容
     */
    // console.log("walletRondom address ",walletRondom.address);
    // console.log("walletRondom private key ",walletRondom.privateKey);
    // console.log("walletRondom public key ",walletRondom.publicKey);
    // console.log("walletRondom mnemonic ",walletRondom.mnemonic);

    //根据助记词生成钱包，和上面的walletRondom地址一样
    const walletMnemonic = new ethers.Wallet.fromMnemonic(walletRondom.mnemonic.phrase);
    // console.log("walletMnemonic address ",walletMnemonic.address);
    //对钱包对象进行加密   加密后取address、privateKey、publicKey就为空
    const jsonWallet = await walletMnemonic.encrypt("foo");

    //解密，解密后和直接生成的对象一样
    let password = "foo";
    const walletFromEncryptedJson = await new ethers.Wallet.fromEncryptedJson(jsonWallet, password);
    // console.log(walletFromEncryptedJson);


    //签名  使用账号私钥
    const msg = "Hello World";
    const walletSignature = await walletMnemonic.signMessage(msg);
    // console.log("wallet signature", walletSignature);

    //验证签名的地址
    const verifyMessage = ethers.utils.verifyMessage(msg, walletSignature);
    // console.log(verifyMessage);


    //使用签名转账
    const provider = new ethers.providers.JsonRpcProvider();
    const amount = '1';
    const amount1 = ethers.utils.parseEther(amount);
    // for signTransaction
    const transactionRequest = {to:"0x4C1FB2d866E9d6e829a18c593c08DC9F97B577eF",value:amount1};
    const transaction = await walletKey.signTransaction(transactionRequest);
    const sendResult = await provider.sendTransaction(transaction);
    console.log(sendResult);


    //钱包转账
    //需要连接节点
    const sendTransactionSigner = walletKey.connect(provider);
    const response = await sendTransactionSigner.sendTransaction(transactionRequest);
    console.log(response);



}


main();