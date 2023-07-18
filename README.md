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

it will till the promise exits it's pending state and will return whatever the pending promise <br>
returns <br>

```contractFactory.deploy()``` returns a promise that resolves to  a contract <br>


![b13](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/3161c30a-522a-4ee0-8d78-8c33587af30d)

Figure2: We can get more information about ```contractFactory.deploy()``` <br>
by going to this link https://docs.ethers.org/v5/search/?search=deploy and typind ```deploy``` in search bar<br>
then going to the blue marked region <br>
for that we need ```async``` before a function name <br>


### Adding transaction overrides 

To see information about a function in VS code there is a trick <br>


![b14](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/0a882f29-08c4-48a0-a22d-fa31a8900d70)

Figure3: if we move a cursor to the ```deploy``` function and hold ```Ctrl``` button and click the link <br>

![b15](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/80ba4b59-7381-4c0f-9dfa-0b5293ffa4f9)

Figure4: we can see the above information about the function <br>



