const TauroToken = artifacts.require("TauroToken");

module.exports = function(deployer) {
  deployer.deploy(TauroToken);
};