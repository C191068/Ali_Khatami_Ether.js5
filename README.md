# Ali_Khatami_Ether.js5(Learning from the video of Pattrick Collins)

### A note on the await keyword 

given in the code below

```javascript

const { ethers } = require("ethers");
const fs = require("fs-extra");

async function main() {
  const provider = ethers.getDefaultProvider("http://127.0.0.1:7545");

  const wallet = new ethers.Wallet(
    "0xdf7fe0ce6c0c9ef5d2987ed2ec597ec2110164e4f01a5729263ff0ac1119da58",
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
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

```


![b12](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/c20335a6-0373-48e0-a23d-9e8c2ba32172)
Figure1: If we deploy the above contract after removing the await keyword in the yellow marked area <br>
we get the above output in the output terminal i.e instead of big contract object <br>
we get the promise in it's pending state because our code actually finish before our contract <br>
could finish deploying <br>

that's why await keyword is so important it at tells the code  to wait until the contract is deployed <br>
It resolves a promise <br>



