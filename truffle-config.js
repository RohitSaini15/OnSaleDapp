require('babel-register');
require('babel-polyfill');
const secrets = require("./secrets.js");

const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = secrets.mnemonicValue

module.exports = {
  networks: {
    //development: {
    //  host: "127.0.0.1",
    //  port: 7545,
    //  network_id: "5777" // Match any network id
    //},
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/05ee904673ee4d5ba2b9896819dd1f0a`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    goerli: {
      provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/05ee904673ee4d5ba2b9896819dd1f0a`),
      network_id: 5,       // Goerli's id
      confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,    // Skip dry run before migrations? (default: false for public nets )
      from: "0xF79f367a190AEFa4F98Da77201c5bE776f8b0f79"
    },
    sepolia: {
      
    }
 
  },


  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.8.4",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
