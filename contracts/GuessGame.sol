pragma solidity ^0.4.20;

contract GuessGame {

    struct Player {
        uint id;
        string name;
        string country;
        uint wins;
        uint losses;
    }

    mapping (uint => Player) public playersById;
    mapping (address => uint) playerIdsByAddress;
    uint public playerCount;

    constructor () public {
    }

    function getPlayer() public view returns(string, string) {
        uint playerId = playerIdsByAddress[msg.sender];
        Player memory player = playersById[playerId];

        // null check
        // reference: https://stackoverflow.com/questions/37852682/are-there-null-like-thing-in-solidity
        if (player.id == 0)
        {
            return ("", "");
        }
        
        return (player.name, player.country);
    }

    function pulishResult(string _name, string _country, uint _wins, uint _losses) public {
        uint playerId = playerIdsByAddress[msg.sender];
        Player storage player = playersById[playerId];

        // null check
        // reference: https://stackoverflow.com/questions/37852682/are-there-null-like-thing-in-solidity
        if (player.id == 0)
        {
            playerCount++;
            playersById[playerCount] = Player(playerCount, _name, _country, _wins, _losses);
            playerIdsByAddress[msg.sender] = playerCount;
            
            return;
        }
        
        player.name = _name;
        player.country = _country;
        player.wins += _wins;
        player.losses += _losses;
    }
}