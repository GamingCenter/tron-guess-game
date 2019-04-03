var GuessGame = artifacts.require("./GuessGame.sol");

contract('GuessGame', function (accounts) {

  let meta

  before(async function () {
    meta = await GuessGame.deployed()
  })

  it("getPlayer for non-existing player should return empty details", async function () {
    const playerDetails = await meta.getPlayer({ from: accounts[0] });

    assert.equal(playerDetails[0], "");
    assert.equal(playerDetails[1], "");
  });

  it("publishResult for non-existing player should create a new player record", async function () {
    await meta.pulishResult("Alex", "NZ", 8, 1, { from: accounts[0] });
    
    const playerCount = await meta.playerCount();
    assert.equal(playerCount, 1);
  });

  it("playersById should return matching player", async function () {
    const player = await meta.playersById(1);

    assert.equal(player.name, "Alex");
    assert.equal(player.country, "NZ");
    assert.equal(player.wins, 8);
    assert.equal(player.losses, 1);
  });

  it("getPlayer for existing player should return details", async function () {
    const playerDetails = await meta.getPlayer({ from: accounts[0] });

    assert.equal(playerDetails[0], "Alex");
    assert.equal(playerDetails[1], "NZ");
  });
  
  it("publishResult for existing player should update the player record", async function () {
    await meta.pulishResult("Alexander", "New Zealand", 1, 2, { from: accounts[0] });

    const player = await meta.playersById(1);

    assert.equal(player.name, "Alexander");
    assert.equal(player.country, "New Zealand");
    assert.equal(player.wins, 9);
    assert.equal(player.losses, 3);
  });

});
