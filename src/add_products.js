require('dotenv').config();
const fs = require('fs');
const fleek = require('@fleekhq/fleek-storage-js');
const Web3 = require('web3');
const OnSale =  require("./abis/OnSale.json");

const apiKey = 'JNPfXlnzvWnHqH6a5FqypQ==';
const apiSecret = 'kWXhf2WKyVyOZs1OaTGDeoij623p1jtWQdfE4ydGflA=';

//connecting to ethereum network
const web3 =  new Web3('https://goerli.infura.io/v3/05ee904673ee4d5ba2b9896819dd1f0a');
//creating a contract instance
const onSale = new web3.eth.Contract(
    OnSale.abi,
    "0x65F3aA4070b22870c9D3Bf8f7AfF44c607F1901e"
  );
console.log(process.env.PRIV_KEY)
//acessing the metamask account using its private key
const { address: admin } = web3.eth.accounts.wallet.add(process.env.PRIV_KEY);

const addItem = (category,product, price, quantity,imageHash) => {

    onSale.methods
      .addItem(category, product, web3.utils.toWei(price), quantity, imageHash)
      .send({ from: admin, gas: 300000 })
      .on("receipt", (receipt) => {
        console.log(`item added ${receipt}`);
       })
    };

// here we are uploading product image to IPFS using Fleek Storage JS
// returning the hash of the image  
const uploadToIpfs = async (product) => {
        
    // Read the image file as binary data
    const imageData = fs.readFileSync("C:/Users/adity/trfl/src/components/utils/images/accessories_3.webp");
    const input = {
        apiKey,
        apiSecret,
        key: `${product}`,//here key is the name of the product
        data: imageData,
    };
      
    try {
        const result = await fleek.upload(input);
        console.log(result.hash);
        return result.hash
    } catch(e) {
        console.log('error', e);
    }
        /* we are not using infura gateway coz it is chargeable
             if ever there is an error using fleek StorageJS or fleek gateway we can try using this again
          const client = create('https://ipfs.infura.io:5001/api/v0')
          try {
            console.log("called 3")
            console.log(this.state.buffer)
            const added = await client.add(this.state.buffer)
            console.log(added.path)
            return added.path
            
          } catch (error) {
            console.log('Error uploading file: ', error)
          } */ 
    };
const category = "accessory"    
const product = "Sport-sunglasses"
const price = ".00015"
const quantity = "12"

uploadToIpfs(product)
.then((result)=>{
console.log(result)
addItem(category, product, price, quantity, result)
})
.catch((error) => {
  console.error("Error adding product:", error);
});

