//imports
const{ethers, run, network}= require("hardhat")
//async main
async function main(){
  const SimpleStorageFactory = await ethers.getContractFactory(
    "SimpleStorage"
)
console.log("deploying contract...")
const SimpleStorage = await SimpleStorageFactory.deploy()
await SimpleStorage.deployed()
// what's the private key
//what's the rpc url
console.log(`Deployed contract to: ${SimpleStorage.address}`)
//what happens when we deploy to our hardhat network?
4 ==4 //->true
4 =="4"//->true
4 === "4"//->false
if(network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY){
  console.log("waiting for blocks txes...")
  await SimpleStorage.deployTransaction.wait(6)
  await verify(SimpleStorage.address,[])
}
const currentValue = await SimpleStorage.retrieve()
console.log(`current value is :${currentValue}`)
//update the current value
const transactionResponse = await SimpleStorage.store(7)
await transactionResponse.wait(1)
const updatedValue = await SimpleStorage.retrieve()
console.log(`updated value is :${updatedValue}`)
}

async function verify(contractAddress,args) {
  console.log("verifying contract...")
  try{
  await run("verify:verify",{
    address: contractAddress,
    constructorArguments: args,
  })
} catch (e){
  if(e.message.toLowerCase().includes("already verified")){
    console.log("already verified!")
  }else{
    console.log(e)
  }
}
}

//main
main()
.then(()=> process.exit(0))
.catch((error) =>{
  console.error(error);
  process.exit(1);
});