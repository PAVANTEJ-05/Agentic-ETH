// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AiFightBetting is ReentrancyGuard, Ownable {
    struct Fight {
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        bool isFinalized;
        uint8 winner; // Changed to uint8
        uint256 totalPool;
        mapping(address => uint256) betsPersonality1;
        mapping(address => uint256) betsPersonality2;
        uint256 totalBetsPersonality1;
        uint256 totalBetsPersonality2;
    }

    mapping(bytes32 => Fight) public fights;
    uint256 public minBetAmount = 0.01 ether;
    uint256 public platformFee = 2; // 2% platform fee
    uint256 public platformFeesAccumulated; // Track accumulated fees

    event FightCreated(bytes32 indexed fightId, uint256 startTime, uint256 endTime);
    event BetPlaced(bytes32 indexed fightId, address indexed better, uint256 amount, uint8 personality);
    event FightFinalized(bytes32 indexed fightId, uint8 winner, uint256 totalPool);
    event WinningsWithdrawn(bytes32 indexed fightId, address indexed winner, uint256 amount);

    // Removed redundant transferOwnership in constructor
    constructor ()Ownable(msg.sender){}

    function createFight(bytes32 fightId, uint256 _startTime, uint256 _endTime) 
        external 
        onlyOwner 
    {
        require(_startTime > block.timestamp, "Start time must be in the future");
        require(_endTime > _startTime, "End time must be after start time");
        
        Fight storage fight = fights[fightId];
        require(!fight.isActive, "Fight already exists");
        
        fight.startTime = _startTime;
        fight.endTime = _endTime;
        fight.isActive = true;
        
        emit FightCreated(fightId, _startTime, _endTime);
    }

    function placeBet(bytes32 fightId, uint8 personality) 
        external 
        payable 
        nonReentrant 
    {
        Fight storage fight = fights[fightId];
        require(fight.isActive, "Fight not active");
        require(!fight.isFinalized, "Fight already finalized");
        require(block.timestamp < fight.endTime, "Betting period ended");
        require(msg.value >= minBetAmount, "Bet amount too low");
        require(personality == 1 || personality == 2, "Invalid personality");

        if (personality == 1) {
            fight.betsPersonality1[msg.sender] += msg.value;
            fight.totalBetsPersonality1 += msg.value;
        } else {
            fight.betsPersonality2[msg.sender] += msg.value;
            fight.totalBetsPersonality2 += msg.value;
        }

        fight.totalPool += msg.value;
        
        emit BetPlaced(fightId, msg.sender, msg.value, personality);
    }

    function finalizeFight(bytes32 fightId, uint8 winningPersonality) 
        external 
        onlyOwner 
    {
        Fight storage fight = fights[fightId];
        require(fight.isActive, "Fight not active");
        require(!fight.isFinalized, "Fight already finalized");
        require(block.timestamp >= fight.endTime, "Fight not ended");
        require(winningPersonality == 1 || winningPersonality == 2, "Invalid personality");
        require(
            (winningPersonality == 1 && fight.totalBetsPersonality1 > 0) ||
            (winningPersonality == 2 && fight.totalBetsPersonality2 > 0),
            "Winner has no bets"
        );

        fight.isFinalized = true;
        fight.winner = winningPersonality;
        fight.isActive = false;

        emit FightFinalized(fightId, winningPersonality, fight.totalPool);
    }

    function claimWinnings(bytes32 fightId) 
        external 
        nonReentrant 
    {
        Fight storage fight = fights[fightId];
        require(fight.isFinalized, "Fight not finalized");
        
        uint256 betAmount;
        uint256 totalWinningBets;
        uint8 winningPersonality = fight.winner;

        if (winningPersonality == 1) {
            betAmount = fight.betsPersonality1[msg.sender];
            totalWinningBets = fight.totalBetsPersonality1;
            fight.betsPersonality1[msg.sender] = 0;
        } else {
            betAmount = fight.betsPersonality2[msg.sender];
            totalWinningBets = fight.totalBetsPersonality2;
            fight.betsPersonality2[msg.sender] = 0;
        }
        
        require(betAmount > 0, "No winning bets");
        require(totalWinningBets > 0, "No bets on winning side");

        uint256 winnings = (betAmount * fight.totalPool) / totalWinningBets;
        uint256 fee = (winnings * platformFee) / 100;
        uint256 payout = winnings - fee;
        
        platformFeesAccumulated += fee;

        (bool success, ) = msg.sender.call{value: payout}("");
        require(success, "Transfer failed");
        
        emit WinningsWithdrawn(fightId, msg.sender, payout);
    }

    function withdrawPlatformFees() 
        external 
        onlyOwner 
    {
        uint256 fees = platformFeesAccumulated;
        require(fees > 0, "No fees available");

        platformFeesAccumulated = 0;
        (bool success, ) = owner().call{value: fees}("");
        require(success, "Transfer failed");
    }

    function getBetAmount(bytes32 fightId, address bettor, uint8 personality) 
        public 
        view 
        returns (uint256) 
    {
        require(personality == 1 || personality == 2, "Invalid personality");
        Fight storage fight = fights[fightId];
        return personality == 1 ? fight.betsPersonality1[bettor] : fight.betsPersonality2[bettor];
    }

    function getFightDetails(bytes32 fightId) 
        public 
        view 
        returns (
            uint256 startTime,
            uint256 endTime,
            bool isActive,
            bool isFinalized,
            uint8 winner,
            uint256 totalPool,
            uint256 totalBets1,
            uint256 totalBets2
        ) 
    {
        Fight storage fight = fights[fightId];
        startTime = fight.startTime;
        endTime = fight.endTime;
        isActive = fight.isActive;
        isFinalized = fight.isFinalized;
        winner = fight.winner;
        totalPool = fight.totalPool;
        totalBets1 = fight.totalBetsPersonality1;
        totalBets2 = fight.totalBetsPersonality2;
    }

    function setMinBetAmount(uint256 _minBetAmount) external onlyOwner {
        minBetAmount = _minBetAmount;
    }

    function setPlatformFee(uint256 _platformFee) external onlyOwner {
        require(_platformFee <= 5, "Fee cannot exceed 5%");
        platformFee = _platformFee;
    }
}