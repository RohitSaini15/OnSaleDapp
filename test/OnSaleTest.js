const { assert } = require('chai')

const OnSaleContract = artifacts.require("OnSale")

require('chai')
  .use(require('chai-as-promised'))
  .should()

  contract("OnSaleContract", ([owner,seller,buyer])=>{
    let myContract

    before(async () => {
      myContract = await OnSaleContract.deployed()
    })

    describe("deployment", async () => {
      it("deploys succesfully", async () =>{
        const address = await myContract.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)

      })
    })

    describe("items", async ()=> {
      let result1,result2,event1,event2,itemCount 

      before(async () => {
        result1 = await myContract.addItem("bag",3,10,{from: seller})
        event1 = result1.logs[0].args
        result2 = await myContract.buy(itemcount,{from: buyer, value: web3.utils.toWei(event1.price, 'Ether')})})
        event2 = result2.logs[0].args
        itemCount = await myContract.itemCount()
      
      })

      it("addItem()", async () => {
      
        assert.equal(Number(itemCount),1)
         
        assert.equal(event1.id.toNumber(),itemCount.toNumber()," product id is correct")
        assert.equal(event1.product,"bag","product is correct")
        assert.equal(event1.price,3,"price is correct")
        assert.equal(event1.quantity,10,"quantity is correct")
        assert.equal(event1.seller,seller,"seller is correct")

      })

      it("buy()", async () => {

        console.log(buyer)
        await myContract.buy(itemCount,{ from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;

        assert.equal(event2.id.toNumber(),itemCount.toNumber(),"order id is correct")
        assert.equal(event2.buyer,buyer,"buyer is correct")
        assert.equal(event2.amount,event1.price,"correct amount")

      })


    })
  
  })

  