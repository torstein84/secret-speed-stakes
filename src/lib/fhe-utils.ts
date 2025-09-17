import { createFhevmInstance } from 'fhevmjs';

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
