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

After that when I try to deploy the contract i faced problem 

![b21](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/847bd4f8-76fc-443a-a51f-dc47cb07f0ab)

Figure10: for that i have used the above command which is white marked at first then use the command <br>
which is yellow marked and succesfully deployed the contract <br>

![b22](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/eb75669d-f855-4539-8701-c99c47e9418d)

figure11: here above we can see all information about our transaction and can understand what our transaction looks like <br>

here to is null because we are creating  a contract 

![b23](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/fed32510-fb87-4a59-aa35-58d6b834f72e)

Figure12: here from is the above address marked <br>

```javascript
const deploymentReceipt = await contract.deployTransaction.wait(1);
```


in the above line of code ```deploymentReceipt``` is what we get when we wait for the trancation confirmation <br>

```deployTransaction``` is what we get when we create our transaction <br>


### Sending a raw transaction in ethersjs

Deploying a contract is sending a transaction <br>


Here in this section we will create a transaction ourselves to understand what is actually going behind the scene <br>

We will deploy the above contract again only by using pure transaction data <br>

for that we have changed the code below:


```javascript

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

```


![b25](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/81051d78-0c4b-455f-a098-2661fac806bc)

Figure13: here txcount is 3 

![b26](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/596515c4-b262-4c7b-9db9-872f02ffb96a)

Figure14: here that's why we have used nonce equal to 4 because we have not used it before <br>

Everytime we send transaction it comes with a bit of ```nonce```. Nonce are used in wallets and signers to send transaction <br>

They use use differrent nonce for every transaction <br>

Nonce when talking about wallets talks about number associated with unique transaction <br>

Nonce when talking about blockchain mining is a value used to solve that hard problem which was taught at blockchain basics <br>

![b27](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/c29a8a0a-e15d-4a4b-aac1-63b56a4cbb7d)

Figure15: To put the data in the white marked region we have to go to this binary file <br>

![b28](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/d5c375b1-4961-4d01-becf-358cebcedde6)

Figure16: we have to copy this data from there <br>

![b29](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/24ffc7f5-ec1b-418f-b5d0-529c909ab8cf)
Figure17: Then at data section after giving double quote within that after tuypin ```0x``` we have to paste it <br>

We have done the above to tell the blockchain or EVM to deploy a smart contract like in the file ```akrkSimplestorage.sol```<br>

![b30](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/1b72f153-0ec0-4221-829e-0637622e2cea)

Figure18: next we will add ```chainId``` <br>


![b31](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/4b28f3c0-458f-4043-ac8a-a82a2a5afc3a)

Figure19: To find the ChainId we select at first the blue marked region then the black marked region <br>

![b32](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/0c1b1509-0f88-48a9-84f9-f4b2b2863bb4)

Figure20: then we will the blue marked network option and find the chainId which is black marked <br>

![b33](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/29b0d713-c405-47a1-8d89-6375c0667cc0)

Figure21: on ```Ganache``` the white marked region ```Network ID``` is equavalent to ```chainId``` <br>

![b34](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/930b1eac-4f38-4783-8ae9-8ac3969c0c73)

Figure22: here the above yellow arrow indicated highlighted parts are information of transaction written in the form of code <br>

![b35](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/6ede36e4-2cca-43e2-9697-a4a817af8335)

Figure23: To signed the above transaction we use the above code marked with white arrow <br>

![b36](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/46752350-8070-47a8-a7ea-cfc4dea02d7f)

Figure24: Here in javascript we commnet the above four lines by highlighting them and clicking ```Ctrl+/``` <br>




```javascript

const { ethers } = require("ethers");
const fs = require("fs-extra");

async function main() {
  const provider = ethers.getDefaultProvider("http://127.0.0.1:7545");

  const wallet = new ethers.Wallet(
    "0x9a496c4da52931db0b5e673d98c32619937581719110af133e55ff61e5a22403",
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

  // const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  // console.log("Executing, please be patient...");
  // const contract = await contractFactory.deploy();
  // const deploymentReceipt = await contract.deployTransaction.wait(1);
  // console.log("Now we will deploy with only transaction data");

  const tx = {
    nonce: 3,
    gasPrice: 20000000000,
    gasLimit: 1000000,
    to: null,
    value: 0,
    data: "0x608060405234801561001057600080fd5b50610771806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632e64cec11461005c5780636057361d1461007a57806366542aa71461009657806381445f8d146100c7578063e0459c57146100e3575b600080fd5b610064610113565b604051610071919061052a565b60405180910390f35b610094600480360381019061008f919061046d565b61011c565b005b6100b060048036038101906100ab919061046d565b610126565b6040516100be929190610545565b60405180910390f35b6100e160048036038101906100dc9190610411565b6101e2565b005b6100fd60048036038101906100f891906103c8565b610272565b60405161010a919061052a565b60405180910390f35b60008054905090565b8060008190555050565b6002818154811061013657600080fd5b906000526020600020906002020160009150905080600001549080600101805461015f9061063e565b80601f016020809104026020016040519081016040528092919081815260200182805461018b9061063e565b80156101d85780601f106101ad576101008083540402835291602001916101d8565b820191906000526020600020905b8154815290600101906020018083116101bb57829003601f168201915b5050505050905082565b600260405180604001604052808381526020018481525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906102489291906102a0565b5050508060018360405161025c9190610513565b9081526020016040518091039020819055505050565b6001818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b8280546102ac9061063e565b90600052602060002090601f0160209004810192826102ce5760008555610315565b82601f106102e757805160ff1916838001178555610315565b82800160010185558215610315579182015b828111156103145782518255916020019190600101906102f9565b5b5090506103229190610326565b5090565b5b8082111561033f576000816000905550600101610327565b5090565b60006103566103518461059a565b610575565b90508281526020810184848401111561037257610371610704565b5b61037d8482856105fc565b509392505050565b600082601f83011261039a576103996106ff565b5b81356103aa848260208601610343565b91505092915050565b6000813590506103c281610724565b92915050565b6000602082840312156103de576103dd61070e565b5b600082013567ffffffffffffffff8111156103fc576103fb610709565b5b61040884828501610385565b91505092915050565b600080604083850312156104285761042761070e565b5b600083013567ffffffffffffffff81111561044657610445610709565b5b61045285828601610385565b9250506020610463858286016103b3565b9150509250929050565b6000602082840312156104835761048261070e565b5b6000610491848285016103b3565b91505092915050565b60006104a5826105cb565b6104af81856105d6565b93506104bf81856020860161060b565b6104c881610713565b840191505092915050565b60006104de826105cb565b6104e881856105e7565b93506104f881856020860161060b565b80840191505092915050565b61050d816105f2565b82525050565b600061051f82846104d3565b915081905092915050565b600060208201905061053f6000830184610504565b92915050565b600060408201905061055a6000830185610504565b818103602083015261056c818461049a565b90509392505050565b600061057f610590565b905061058b8282610670565b919050565b6000604051905090565b600067ffffffffffffffff8211156105b5576105b46106d0565b5b6105be82610713565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561062957808201518184015260208101905061060e565b83811115610638576000848401525b50505050565b6000600282049050600182168061065657607f821691505b6020821081141561066a576106696106a1565b5b50919050565b61067982610713565b810181811067ffffffffffffffff82111715610698576106976106d0565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61072d816105f2565b811461073857600080fd5b5056fea2646970667358221220d94fa8475138e5d0539d7113dbb2b2f5c766adba8bff8ac4663e95e1a8c4271b64736f6c63430008070033",
    chainId: 5777,
  };

  const signedTxResponse = await wallet.signTransaction(tx);
  console.log(signedTxResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

```

![b37](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/dbd3b147-a259-4949-a85c-0578b16a37df)

Figure25: here we can see after giving the command to deploy the contract we see the massive code <br>
It is proved that our transaction is signed <br>

![b38](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/555cf960-ad06-4ec8-9c5b-d8be06eef4f0)
Figure26; here we see that in the block no transaction is send , because we have signed the transaction <br>
not send it <br>

![b39](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/6491fe15-9311-4062-b419-8ee5fb685407)

Figure27: To send a transaction we have use the three lines of code shown with white arrows <br>
Then in the console when we deploy the contract(yellow arrow) we got error(blue marked) <br>

![b40](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/7dcb2ee7-0e1e-4adc-93c7-3dcb9dc4e3f8)

Figure28: For that I have made three changes in the code first two was with  nonce and last one with chainID <br>

We have use the this line of code ```const nonce = await wallet.getTransactionCount();``` <br>
to keep updating the nonce so that we don't have to update nonce ourselves <br>



![b41](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/c6f8135e-9be5-4c71-bdc9-953f441dc28f)

Figure29: to change the chainId at first go to the settings icon <br>

![b42](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/d6198dcd-51b5-4355-a72a-220e15589894)

figure30: at the server option marked with black and in the network id field change from ```5777``` to ```1337``` <br>

![b43](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/600480e1-29b9-4f4c-8bd9-433d1a98f487)

figure31: In the console we can see our contract is successfuully deployed <br>

![b44](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/08817b04-8967-4bbc-8ab1-94cacad89220)

Figure32: here at ```Ganache``` successful transactions occured <br>


![b45](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/5c8eb987-8a48-42ac-abd2-d2e6bad722b2)

Figure33: Here putting the cursor on the sendTransaction(tx) and right click then click ```Go to Definition```<br>
or F12 <br>


![b46](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/a6961233-cf7d-4184-aba1-6d0afe232650)
Figure34: Then here in the file by this line of code ```const signedTx = await this.signTransaction(tx);``` <br>
it means that the transcation is signed at first before sending <br>


Thus , we have learned how to send transaction using pure javascript and pure ethers <br>

![b47](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/329e0997-402a-44d3-89e3-f1f1fd850c1f)

Figure35: every time we are changing the state of blockchain we are sending transaction which look like above<br>

here data is differentiator, the data for us here is the data send to create a new contract <br>

when we use functions in our smart contract the data we send in transac tion is data associated <br>
with htis transactions <br>

![b48](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/03a7864f-9bbe-4149-824c-c5da318d42fc)

Figure36: when nwe call function with Ethers or Hardhat we don't gonna use athe above thus we comment those <br>

![b49](https://github.com/C191068/Ali_Khatami_Ether.js5/assets/89090776/037daf9b-9580-4c9b-881f-1c9c10ee2a23)

Figure37: We have uncomment the above four lines of code that we have commented before <br>\



# 7:24:39



