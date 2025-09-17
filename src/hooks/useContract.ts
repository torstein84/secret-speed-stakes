import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/config/contract';
import { encryptEthAmount, validateEncryptedData } from '@/lib/fhe-utils';
import { useState } from 'react';

export interface Race {
  id: string;
  name: string;
  track: string;
  startTime: string;
  totalBets: number;
  participants: number;
  status: 'upcoming' | 'live' | 'finished';
  prizePool: string;
  organizer: string;
  endTime: number;
  maxParticipants: number;
}

export interface Participant {
  id: string;
  name: string;
  address: string;
  joinTime: number;
  stakeAmount: string;
  performanceScore: string;
  isWinner: boolean;
}

export interface Stake {
  id: string;
  raceId: string;
  participantId: string;
  amount: string;
  staker: string;
  stakeTime: number;
  isActive: boolean;
}

export function useContract() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const [isEncrypting, setIsEncrypting] = useState(false);
  const [encryptionError, setEncryptionError] = useState<string | null>(null);

  // Create a new race
  const createRace = async (
    raceName: string,
    raceDescription: string,
    startTime: number,
    endTime: number,
    maxParticipants: number
  ) => {
    if (!address) throw new Error('Wallet not connected');

    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'createRace',
        args: [raceName, raceDescription, startTime, endTime, maxParticipants],
      });
    } catch (err) {
      console.error('Failed to create race:', err);
      throw err;
    }
  };

  // Join a race
  const joinRace = async (raceId: string, participantName: string) => {
    if (!address) throw new Error('Wallet not connected');

    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'joinRace',
        args: [BigInt(raceId), participantName],
      });
    } catch (err) {
      console.error('Failed to join race:', err);
      throw err;
    }
  };

  // Place a stake with FHE encryption
  const placeStake = async (
    raceId: string,
    participantId: string,
    ethAmount: string
  ) => {
    if (!address) throw new Error('Wallet not connected');

    setIsEncrypting(true);
    setEncryptionError(null);

    try {
      // Encrypt the stake amount
      const { encryptedData, inputProof } = await encryptEthAmount(ethAmount, address);

      // Validate the encrypted data
      const isValid = await validateEncryptedData(encryptedData, inputProof, address);
      if (!isValid) {
        throw new Error('Encrypted data validation failed');
      }

      // Convert ETH amount to wei for the transaction
      const weiAmount = parseEther(ethAmount);

      // Call the contract with encrypted data
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'placeStake',
        args: [BigInt(raceId), BigInt(participantId), encryptedData, inputProof],
        value: weiAmount,
      });
    } catch (err) {
      console.error('Failed to place stake:', err);
      setEncryptionError(err instanceof Error ? err.message : 'Encryption failed');
      throw err;
    } finally {
      setIsEncrypting(false);
    }
  };

  // Record performance data
  const recordPerformance = async (
    participantId: string,
    speedScore: number,
    accuracyScore: number,
    enduranceScore: number
  ) => {
    if (!address) throw new Error('Wallet not connected');

    setIsEncrypting(true);
    setEncryptionError(null);

    try {
      // Encrypt performance scores
      const { encryptedSpeed, encryptedAccuracy, encryptedEndurance, inputProof } = 
        await encryptScores(speedScore, accuracyScore, enduranceScore, CONTRACT_ADDRESS, address);

      // Call the contract
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'recordPerformance',
        args: [
          BigInt(participantId),
          encryptedSpeed,
          encryptedAccuracy,
          encryptedEndurance,
          inputProof
        ],
      });
    } catch (err) {
      console.error('Failed to record performance:', err);
      setEncryptionError(err instanceof Error ? err.message : 'Encryption failed');
      throw err;
    } finally {
      setIsEncrypting(false);
    }
  };

  // Finish a race
  const finishRace = async (raceId: string, winnerParticipantId: string) => {
    if (!address) throw new Error('Wallet not connected');

    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'finishRace',
        args: [BigInt(raceId), BigInt(winnerParticipantId)],
      });
    } catch (err) {
      console.error('Failed to finish race:', err);
      throw err;
    }
  };

  return {
    // Contract functions
    createRace,
    joinRace,
    placeStake,
    recordPerformance,
    finishRace,
    
    // Transaction state
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    
    // Encryption state
    isEncrypting,
    encryptionError,
    
    // User info
    address,
  };
}

// Hook for reading contract data
export function useRaceData(raceId?: string) {
  const { data: raceInfo, isLoading: isLoadingRace } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getRaceInfo',
    args: raceId ? [BigInt(raceId)] : undefined,
  });

  return {
    raceInfo,
    isLoadingRace,
  };
}

// Hook for reading participant data
export function useParticipantData(participantId?: string) {
  const { data: participantInfo, isLoading: isLoadingParticipant } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getParticipantInfo',
    args: participantId ? [BigInt(participantId)] : undefined,
  });

  return {
    participantInfo,
    isLoadingParticipant,
  };
}

