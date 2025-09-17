import { encryptEthAmount, validateEncryptedData, decryptAmount } from '@/lib/fhe-utils';

// Test function to verify the complete bet flow
export async function testBetFlow() {
  console.log('🧪 Testing Place Bet Flow...');
  
  const testUserAddress = '0x1234567890123456789012345678901234567890';
  const testAmount = '0.1'; // 0.1 ETH
  
  try {
    // Step 1: Encrypt the bet amount
    console.log('📝 Step 1: Encrypting bet amount...');
    const { encryptedData, inputProof } = await encryptEthAmount(testAmount, testUserAddress);
    console.log('✅ Encryption successful');
    console.log('   Encrypted data:', encryptedData);
    console.log('   Input proof:', inputProof);
    
    // Step 2: Validate the encrypted data
    console.log('🔍 Step 2: Validating encrypted data...');
    const isValid = await validateEncryptedData(encryptedData, inputProof, testUserAddress);
    console.log('✅ Validation result:', isValid);
    
    if (!isValid) {
      throw new Error('Encrypted data validation failed');
    }
    
    // Step 3: Decrypt for verification (optional - for testing only)
    console.log('🔓 Step 3: Decrypting for verification...');
    const decryptedAmount = await decryptAmount(encryptedData, testUserAddress);
    console.log('✅ Decryption successful');
    console.log('   Original amount:', testAmount, 'ETH');
    console.log('   Decrypted amount:', decryptedAmount);
    
    // Step 4: Verify amounts match
    const originalWei = parseFloat(testAmount) * 1e18;
    const isAmountCorrect = Math.abs(decryptedAmount - originalWei) < 1; // Allow 1 wei tolerance
    console.log('✅ Amount verification:', isAmountCorrect ? 'PASSED' : 'FAILED');
    
    if (isAmountCorrect) {
      console.log('🎉 All tests passed! Place Bet flow is working correctly.');
      return {
        success: true,
        encryptedData,
        inputProof,
        originalAmount: testAmount,
        decryptedAmount: decryptedAmount / 1e18
      };
    } else {
      throw new Error('Amount verification failed');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Test function for performance scores encryption
export async function testPerformanceEncryption() {
  console.log('🧪 Testing Performance Encryption...');
  
  const testUserAddress = '0x1234567890123456789012345678901234567890';
  const testScores = {
    speed: 85,
    accuracy: 92,
    endurance: 78
  };
  
  try {
    // Import the encryptScores function
    const { encryptScores } = await import('@/lib/fhe-utils');
    
    console.log('📝 Encrypting performance scores...');
    const result = await encryptScores(
      testScores.speed,
      testScores.accuracy,
      testScores.endurance,
      '0x0000000000000000000000000000000000000000', // Mock contract address
      testUserAddress
    );
    
    console.log('✅ Performance encryption successful');
    console.log('   Encrypted speed:', result.encryptedSpeed);
    console.log('   Encrypted accuracy:', result.encryptedAccuracy);
    console.log('   Encrypted endurance:', result.encryptedEndurance);
    console.log('   Input proof:', result.inputProof);
    
    return {
      success: true,
      ...result,
      originalScores: testScores
    };
    
  } catch (error) {
    console.error('❌ Performance encryption test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Run all tests
export async function runAllTests() {
  console.log('🚀 Running all Place Bet flow tests...\n');
  
  const betFlowResult = await testBetFlow();
  console.log('\n' + '='.repeat(50) + '\n');
  
  const performanceResult = await testPerformanceEncryption();
  console.log('\n' + '='.repeat(50) + '\n');
  
  const allPassed = betFlowResult.success && performanceResult.success;
  
  console.log('📊 Test Summary:');
  console.log('   Bet Flow Test:', betFlowResult.success ? '✅ PASSED' : '❌ FAILED');
  console.log('   Performance Test:', performanceResult.success ? '✅ PASSED' : '❌ FAILED');
  console.log('   Overall Result:', allPassed ? '🎉 ALL TESTS PASSED' : '❌ SOME TESTS FAILED');
  
  return {
    allPassed,
    betFlowResult,
    performanceResult
  };
}

