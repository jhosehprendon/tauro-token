const TauroToken = artifacts.require("TauroToken");

module.exports = function(deployer) {
  deployer.deploy(TauroToken, 1000000);
};