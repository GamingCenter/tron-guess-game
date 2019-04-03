var GuessGame = artifacts.require("./GuessGame.sol");

module.exports = function(deployer) {
  deployer.deploy(GuessGame);
};
