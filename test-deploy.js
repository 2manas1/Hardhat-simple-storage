const{ethers}=require("hardhat")
const{ expect, assert}= require("chai")
const { experimentalAddHardhatNetworkMessageTraceHook } = require("hardhat/config")
describe("SimpleStorage",function(){
  //let SimpleStorageFactory
    //let SimpleStorage
    let SimpleStorageFactory,SimpleStorage
  beforeEach(async function(){
    
     SimpleStorageFactory=await ethers.getContractFactory ("SimpleStorage")
     SimpleStorage = await SimpleStorageFactory.deploy()
  })

  it("should start with a favourite number of 0",async function(){
    const currentValue = await SimpleStorage.retrieve()
    const expectedvalue ="0"
    //assert
    //expect
    
    assert.equal(currentValue.toString(),expectedvalue)
    //expect(currentValue.toString()).to.equal(expectedvalue) this is same as assert( above).
  })
  it("should update when we call store",async function(){
    const expectedvalue ="7"
    const transactionResponse = await SimpleStorage.store(expectedvalue)
    await transactionResponse.wait(1)

    const currentValue =await SimpleStorage.retrieve()
    assert.equal(currentValue.toString(),expectedvalue)
  })
})