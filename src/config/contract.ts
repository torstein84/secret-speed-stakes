import { Address } from 'viem';

// Contract configuration
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as Address;
export const CHAIN_ID = Number(import.meta.env.VITE_CHAIN_ID || '11155111');
export const RPC_URL = import.meta.env.VITE_RPC_URL || 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990';

// Contract ABI (will be generated after deployment)
export const CONTRACT_ABI = [
  // Events
  "event RaceCreated(uint256 indexed raceId, address indexed organizer, string raceName)",
  "event ParticipantJoined(uint256 indexed raceId, uint256 indexed participantId, address indexed participant)",
  "event StakePlaced(uint256 indexed stakeId, uint256 indexed raceId, uint256 indexed participantId, address indexed staker)",
  "event RaceFinished(uint256 indexed raceId, uint256 indexed winnerId)",
  "event PerformanceRecorded(uint256 indexed performanceId, uint256 indexed participantId, address indexed verifier)",
  "event ReputationUpdated(address indexed user, uint32 reputation)",
  
  // Functions
  "function createRace(string memory _raceName, string memory _raceDescription, uint256 _startTime, uint256 _endTime, uint256 _maxParticipants) external returns (uint256)",
  "function joinRace(uint256 raceId, string memory _participantName) external returns (uint256)",
  "function placeStake(uint256 raceId, uint256 participantId, bytes32 amount, bytes calldata inputProof) external payable returns (uint256)",
  "function recordPerformance(uint256 participantId, bytes32 speedScore, bytes32 accuracyScore, bytes32 enduranceScore, bytes calldata inputProof) external returns (uint256)",
  "function finishRace(uint256 raceId, uint256 winnerParticipantId) external",
  "function getRaceInfo(uint256 raceId) external view returns (string memory, string memory, address, uint256, uint256, uint256)",
  "function getParticipantInfo(uint256 participantId) external view returns (address, string memory, uint256)",
  "function owner() external view returns (address)",
  "function verifier() external view returns (address)",
  "function platformFeePercentage() external view returns (uint256)"
] as const;
