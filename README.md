![image](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/2093875e-342e-40f8-96b4-8c67ce410c62)# Ali_Khatami_Ether.js5(Learning from the video of Pattrick Collins)

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

![b15](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/a5654a02-7730-439f-9359-02d15bfad9e1)
Figure4: we can see the above information about the function <br>
if we look at the white underlined part of the code we can see the same code as we see in the documentation <br>

![b16](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/9456dabb-fc86-49af-a2b2-40ac40875d90)

Figure5: here args are list of some ovverides that we can specify with some brackets <br>

below we have made a change in our ```akrkdeploy.js``` file <br>

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
  const contract = await contractFactory.deploy({ gasPrice: 100000000000 });
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

```
![b17](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/3ad331d7-4760-4787-9378-0ffc33c6f2e5)

Figure6: we have set the gas price <br>


![b18](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/d6fb3291-63b5-46ff-8753-a706ba775606)

Figure7: then we deployed the contract <br>

![b19](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/0357c901-c948-405c-8cbe-92d99eb964f1)

Figure8: we see that the account balance of the wallet account have decreased from 100 eth to 99.95 eth <br>

### Transaction receipts

we can wait for a certain number of blocks for our contract to finish with <br>

We have deployed our contract but it will be better to wait one block more <br>

to make sure that it actually gets attached to the blockchain <br>

for that we have changed the code in the following way:

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
  const contract = await contractFactory.deploy({ gasPrice: 100000000000 });
  const deploymentReceipt = await contract.deploymentTransaction.wait(1);
  console.log(deploymentReceipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


```



![b20](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/4b4f4736-65a2-467d-9a4f-7aa7628b2cbb)

Figure9: we have used this line in the code <br>





