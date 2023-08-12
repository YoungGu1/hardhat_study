async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy();
  console.log("Lock address:", lock.address);
}
main();

