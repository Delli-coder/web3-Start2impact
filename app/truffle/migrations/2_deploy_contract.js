const newCompany = artifacts.require("./newCompany.sol");

module.exports = function(deployer) {
  deployer.deploy(newCompany);
};
