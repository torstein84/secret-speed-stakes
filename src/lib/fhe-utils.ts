import { createFhevmInstance } from 'fhevmjs';
import { parseEther, formatEther } from 'viem';

let fhevmInstance: any = null;

export async function initializeFHE() {
  if (!fhevmInstance) {
    fhevmInstance = await createFhevmInstance();
  }
  return fhevmInstance;
}

export async function getFhevmInstance() {
  if (!fhevmInstance) {
    await initializeFHE();
  }
  return fhevmInstance;
}

// Contract address - will be set after deployment
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

export async function encryptAmount(
  value: number,
  contractAddress: string,
  userAddress: string
): Promise<{ encryptedData: string; inputProof: string }> {
  const instance = await getFhevmInstance();
  
  // Generate encryption key
  const encryptionKey = await instance.generatePublicKey(contractAddress);
  
  // Encrypt the value
  const encryptedData = await instance.encrypt32(value, encryptionKey);
  
  // Generate input proof
  const inputProof = await instance.generateInputProof(contractAddress, userAddress, encryptedData);
  
  return {
    encryptedData: encryptedData,
    inputProof: inputProof
  };
}

export async function encryptScores(
  speedScore: number,
  accuracyScore: number,
  enduranceScore: number,
  contractAddress: string,
  userAddress: string
): Promise<{ 
  encryptedSpeed: string; 
  encryptedAccuracy: string; 
  encryptedEndurance: string; 
  inputProof: string 
}> {
  const instance = await getFhevmInstance();
  
  // Generate encryption key
  const encryptionKey = await instance.generatePublicKey(contractAddress);
  
  // Encrypt all scores
  const encryptedSpeed = await instance.encrypt32(speedScore, encryptionKey);
  const encryptedAccuracy = await instance.encrypt32(accuracyScore, encryptionKey);
  const encryptedEndurance = await instance.encrypt32(enduranceScore, encryptionKey);
  
  // Generate input proof for all encrypted values
  const inputProof = await instance.generateInputProof(
    contractAddress, 
    userAddress, 
    [encryptedSpeed, encryptedAccuracy, encryptedEndurance]
  );
  
  return {
    encryptedSpeed,
    encryptedAccuracy,
    encryptedEndurance,
    inputProof
  };
}

// Encrypt ETH amount for betting
export async function encryptEthAmount(
  ethAmount: string,
  userAddress: string
): Promise<{ encryptedData: string; inputProof: string }> {
  const instance = await getFhevmInstance();
  
  // Convert ETH to wei and then to number for encryption
  const weiAmount = parseEther(ethAmount);
  const amountNumber = Number(weiAmount);
  
  // Generate encryption key
  const encryptionKey = await instance.generatePublicKey(CONTRACT_ADDRESS);
  
  // Encrypt the amount
  const encryptedData = await instance.encrypt32(amountNumber, encryptionKey);
  
  // Generate input proof
  const inputProof = await instance.generateInputProof(CONTRACT_ADDRESS, userAddress, encryptedData);
  
  return {
    encryptedData: encryptedData,
    inputProof: inputProof
  };
}

// Decrypt encrypted data (for testing/verification)
export async function decryptAmount(
  encryptedData: string,
  userAddress: string
): Promise<number> {
  const instance = await getFhevmInstance();
  
  try {
    const decrypted = await instance.decrypt(CONTRACT_ADDRESS, encryptedData);
    return Number(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt data');
  }
}

// Validate encrypted data integrity
export async function validateEncryptedData(
  encryptedData: string,
  inputProof: string,
  userAddress: string
): Promise<boolean> {
  const instance = await getFhevmInstance();
  
  try {
    const isValid = await instance.verifyInputProof(CONTRACT_ADDRESS, userAddress, encryptedData, inputProof);
    return isValid;
  } catch (error) {
    console.error('Validation failed:', error);
    return false;
  }
}

// Get user's encrypted reputation
export async function getUserReputation(userAddress: string): Promise<string> {
  const instance = await getFhevmInstance();
  
  try {
    // This would call the contract to get encrypted reputation
    // For now, return a placeholder
    return '0x0000000000000000000000000000000000000000000000000000000000000000';
  } catch (error) {
    console.error('Failed to get user reputation:', error);
    return '0x0000000000000000000000000000000000000000000000000000000000000000';
  }
}
