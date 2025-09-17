// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// Mock FHE types for development and testing
struct euint32 {
    uint256 value;
}

struct ebool {
    bool value;
}

struct externalEuint32 {
    uint256 value;
}

library FHE {
    function asEuint32(uint256 value) internal pure returns (euint32) {
        return euint32(value);
    }
    
    function asEbool(bool value) internal pure returns (ebool) {
        return ebool(value);
    }
    
    function fromExternal(externalEuint32 externalValue, bytes calldata) internal pure returns (euint32) {
        return euint32(externalValue.value);
    }
    
    function add(euint32 a, euint32 b) internal pure returns (euint32) {
        return euint32(a.value + b.value);
    }
}

contract SecretSpeedStakes is Ownable, ReentrancyGuard {
    using FHE for *;
    
    struct Race {
        euint32 raceId;
        euint32 totalStakes;
        euint32 participantCount;
        euint32 winnerId;
        ebool isActive;
        ebool isFinished;
        string raceName;
        string raceDescription;
        address organizer;
        uint256 startTime;
        uint256 endTime;
        uint256 maxParticipants;
    }
    
    struct Participant {
        euint32 participantId;
        euint32 stakeAmount;
        euint32 performanceScore;
        ebool isWinner;
        address participantAddress;
        string participantName;
        uint256 joinTime;
    }
    
    struct Stake {
        euint32 stakeId;
        euint32 amount;
        euint32 participantId;
        ebool isActive;
        address staker;
        uint256 stakeTime;
    }
    
    struct PerformanceData {
        euint32 participantId;
        euint32 speedScore;
        euint32 accuracyScore;
        euint32 enduranceScore;
        ebool isVerified;
        address verifier;
        uint256 timestamp;
    }
    
    mapping(uint256 => Race) public races;
    mapping(uint256 => Participant) public participants;
    mapping(uint256 => Stake) public stakes;
    mapping(uint256 => PerformanceData) public performanceData;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public totalStakesWon;
    
    uint256 public raceCounter;
    uint256 public participantCounter;
    uint256 public stakeCounter;
    uint256 public performanceCounter;
    
    address public verifier;
    uint256 public platformFeePercentage = 5; // 5% platform fee
    
    event RaceCreated(uint256 indexed raceId, address indexed organizer, string raceName);
    event ParticipantJoined(uint256 indexed raceId, uint256 indexed participantId, address indexed participant);
    event StakePlaced(uint256 indexed stakeId, uint256 indexed raceId, uint256 indexed participantId, address indexed staker);
    event RaceFinished(uint256 indexed raceId, uint256 indexed winnerId);
    event PerformanceRecorded(uint256 indexed performanceId, uint256 indexed participantId, address indexed verifier);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) Ownable(msg.sender) {
        verifier = _verifier;
    }
    
    function createRace(
        string memory _raceName,
        string memory _raceDescription,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _maxParticipants
    ) public returns (uint256) {
        require(_startTime > block.timestamp, "Start time must be in the future");
        require(_endTime > _startTime, "End time must be after start time");
        require(_maxParticipants > 0, "Max participants must be greater than 0");
        
        uint256 raceId = raceCounter++;
        
        races[raceId] = Race({
            raceId: FHE.asEuint32(0), // Will be set properly later
            totalStakes: FHE.asEuint32(0),
            participantCount: FHE.asEuint32(0),
            winnerId: FHE.asEuint32(0),
            isActive: FHE.asEbool(true),
            isFinished: FHE.asEbool(false),
            raceName: _raceName,
            raceDescription: _raceDescription,
            organizer: msg.sender,
            startTime: _startTime,
            endTime: _endTime,
            maxParticipants: _maxParticipants
        });
        
        emit RaceCreated(raceId, msg.sender, _raceName);
        return raceId;
    }
    
    function joinRace(
        uint256 raceId,
        string memory _participantName
    ) public returns (uint256) {
        require(races[raceId].organizer != address(0), "Race does not exist");
        require(block.timestamp >= races[raceId].startTime, "Race has not started yet");
        require(block.timestamp <= races[raceId].endTime, "Race has ended");
        
        uint256 participantId = participantCounter++;
        
        participants[participantId] = Participant({
            participantId: FHE.asEuint32(0), // Will be set properly later
            stakeAmount: FHE.asEuint32(0),
            performanceScore: FHE.asEuint32(0),
            isWinner: FHE.asEbool(false),
            participantAddress: msg.sender,
            participantName: _participantName,
            joinTime: block.timestamp
        });
        
        // Update race participant count
        races[raceId].participantCount = FHE.add(races[raceId].participantCount, FHE.asEuint32(1));
        
        emit ParticipantJoined(raceId, participantId, msg.sender);
        return participantId;
    }
    
    function placeStake(
        uint256 raceId,
        uint256 participantId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public payable nonReentrant returns (uint256) {
        require(races[raceId].organizer != address(0), "Race does not exist");
        require(participants[participantId].participantAddress != address(0), "Participant does not exist");
        require(block.timestamp <= races[raceId].endTime, "Race has ended");
        
        uint256 stakeId = stakeCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        stakes[stakeId] = Stake({
            stakeId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            participantId: FHE.asEuint32(participantId),
            isActive: FHE.asEbool(true),
            staker: msg.sender,
            stakeTime: block.timestamp
        });
        
        // Update participant stake amount
        participants[participantId].stakeAmount = FHE.add(participants[participantId].stakeAmount, internalAmount);
        
        // Update race total stakes
        races[raceId].totalStakes = FHE.add(races[raceId].totalStakes, internalAmount);
        
        emit StakePlaced(stakeId, raceId, participantId, msg.sender);
        return stakeId;
    }
    
    function recordPerformance(
        uint256 participantId,
        externalEuint32 speedScore,
        externalEuint32 accuracyScore,
        externalEuint32 enduranceScore,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(msg.sender == verifier || msg.sender == owner(), "Only verifier or owner can record performance");
        require(participants[participantId].participantAddress != address(0), "Participant does not exist");
        
        uint256 performanceId = performanceCounter++;
        
        // Convert external values to internal FHE values
        euint32 internalSpeedScore = FHE.fromExternal(speedScore, inputProof);
        euint32 internalAccuracyScore = FHE.fromExternal(accuracyScore, inputProof);
        euint32 internalEnduranceScore = FHE.fromExternal(enduranceScore, inputProof);
        
        // Calculate overall performance score (weighted average)
        euint32 overallScore = FHE.add(
            FHE.add(internalSpeedScore, internalAccuracyScore),
            internalEnduranceScore
        );
        
        performanceData[performanceId] = PerformanceData({
            participantId: FHE.asEuint32(participantId),
            speedScore: internalSpeedScore,
            accuracyScore: internalAccuracyScore,
            enduranceScore: internalEnduranceScore,
            isVerified: FHE.asEbool(true),
            verifier: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update participant performance score
        participants[participantId].performanceScore = overallScore;
        
        emit PerformanceRecorded(performanceId, participantId, msg.sender);
        return performanceId;
    }
    
    function finishRace(
        uint256 raceId,
        uint256 winnerParticipantId
    ) public {
        require(msg.sender == races[raceId].organizer || msg.sender == owner(), "Only organizer or owner can finish race");
        require(races[raceId].organizer != address(0), "Race does not exist");
        require(block.timestamp >= races[raceId].endTime, "Race has not ended yet");
        
        // Mark race as finished
        races[raceId].isFinished = FHE.asEbool(true);
        races[raceId].isActive = FHE.asEbool(false);
        races[raceId].winnerId = FHE.asEuint32(winnerParticipantId);
        
        // Mark winner
        participants[winnerParticipantId].isWinner = FHE.asEbool(true);
        
        emit RaceFinished(raceId, winnerParticipantId);
    }
    
    function updateReputation(
        address user,
        externalEuint32 reputationChange,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier || msg.sender == owner(), "Only verifier or owner can update reputation");
        
        euint32 internalReputationChange = FHE.fromExternal(reputationChange, inputProof);
        userReputation[user] = FHE.add(userReputation[user], internalReputationChange);
        
        emit ReputationUpdated(user, 0); // Amount will be decrypted off-chain
    }
    
    function setVerifier(address _verifier) public onlyOwner {
        verifier = _verifier;
    }
    
    function setPlatformFee(uint256 _feePercentage) public onlyOwner {
        require(_feePercentage <= 20, "Platform fee cannot exceed 20%");
        platformFeePercentage = _feePercentage;
    }
    
    // View functions for public data
    function getRaceInfo(uint256 raceId) public view returns (
        string memory raceName,
        string memory raceDescription,
        address organizer,
        uint256 startTime,
        uint256 endTime,
        uint256 maxParticipants
    ) {
        Race storage race = races[raceId];
        return (
            race.raceName,
            race.raceDescription,
            race.organizer,
            race.startTime,
            race.endTime,
            race.maxParticipants
        );
    }
    
    function getParticipantInfo(uint256 participantId) public view returns (
        address participantAddress,
        string memory participantName,
        uint256 joinTime
    ) {
        Participant storage participant = participants[participantId];
        return (
            participant.participantAddress,
            participant.participantName,
            participant.joinTime
        );
    }
}