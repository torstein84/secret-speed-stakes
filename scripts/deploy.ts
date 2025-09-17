import { ethers } from "hardhat";

async function main() {
  console.log("Deploying SecretSpeedStakes contract...");

  // Get the contract factory
  const SecretSpeedStakes = await ethers.getContractFactory("SecretSpeedStakes");

  // Deploy the contract with a verifier address (using deployer as verifier for now)
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  const secretSpeedStakes = await SecretSpeedStakes.deploy(deployer.address);

  await secretSpeedStakes.waitForDeployment();

  const contractAddress = await secretSpeedStakes.getAddress();
  console.log("SecretSpeedStakes deployed to:", contractAddress);

  // Verify deployment
  console.log("Verifying deployment...");
  const owner = await secretSpeedStakes.owner();
  const verifier = await secretSpeedStakes.verifier();
  const platformFee = await secretSpeedStakes.platformFeePercentage();

  console.log("Contract owner:", owner);
  console.log("Contract verifier:", verifier);
  console.log("Platform fee percentage:", platformFee.toString());

  console.log("Deployment completed successfully!");
  console.log("Contract address:", contractAddress);
  console.log("Network:", await deployer.provider.getNetwork());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

