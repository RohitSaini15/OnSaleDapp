const NFTcontract = artifacts.require("OnSale");

module.exports = function(deployer) {
  deployer.deploy(NFTcontract,"ipfs://QmbwLaWiVwZ2v6YXDoMcUfUC3p16CBcc4kdGYrWB9vT8fJ/");
};
