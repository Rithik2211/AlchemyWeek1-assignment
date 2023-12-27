const hre = require("hardhat");

async function main() {
  const Contract = await hre.ethers.getContractFactory("Contract");
  const contract = await Contract.deploy();
  await contract.deployTransaction.wait();

  console.log(`Contract Address : ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
