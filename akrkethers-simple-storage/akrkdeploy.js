const { ethers } = require("ethers");
const fs = require("fs-extra");

async function main() {
  const provider = ethers.getDefaultProvider("http://127.0.0.1:7545");

  const wallet = new ethers.Wallet(
    "0xe520cfe42a8ee1473293ab7eaa36a4a59e342afe40b1ab1ca80a10c9b3b23468",
    provider
  );

  const abi = fs.readFileSync(
    "./akrkSimplestorage_sol_akrkSimplestorage.abi",
    "utf8"
  );

  const binary = fs.readFileSync(
    "./akrkSimplestorage_sol_akrkSimplestorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Executing, please be patient...");
  const contract = await contractFactory.deploy();
  const deploymentReceipt = await contract.deployTransaction.wait(1);
  console.log("Come on we will deploy with only transaction data!");

  const tx = {
    nonce:
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
