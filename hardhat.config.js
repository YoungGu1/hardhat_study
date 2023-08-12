require("@nomicfoundation/hardhat-toolbox");
require("./hardhat.tasks");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    infura:{
      url:`https://mainnet.infura.io/v3/8cf1a800b0b14c89bcacad7171eeac97`
    }
  }
};


//上下文中添加web3对象
//extendEnvironment方法允许你扩展 Hardhat 环境（hre 对象）
extendEnvironment((hre) => {
  const Web3 = require("web3");
  hre.Web3 = Web3;
  hre.web3 = new Web3(hre.network.provider);
});

// const GOERLI_API_URL = "https://eth-goerli.g.alchemy.com/v2/auzz3Ba0_bxwxMl1JtC3UTeSs0EGo9S9";
// const PRIVATE_KEY = "11fe552535b31d0075df993511894499960f13571623e49f7ddddf59eca4cb20";
// module.exports = {
//   solidity: "0.8.9",
//   networks: {
//     goerli: {
//       url: `${GOERLI_API_URL}`,
//       accounts: [`${PRIVATE_KEY}`]
//     }
//   },
// };


// module.exports = {
//   solidity: "0.8.9",
//   hardhat: {
//     forking: {
//       url: "https://eth-mainnet.alchemyapi.io/v2/Gu8Au3-L5xNG32c-NHmB5eKNBxJZUayA",
//     }
//   }
// };

