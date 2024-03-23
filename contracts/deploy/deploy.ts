import { upgrades, ethers, hardhatArguments } from "hardhat";
// import { Box__factory } from "typechain-types";
// import { addDeployment, delay, verify } from "utils";
// import { networksConfig } from "config";

/**
 * Use this script to deploy and verify a smart contract based on the UUPS proxy pattern
 *
 * For a step-by-step process follow the next link
 * https://docs.openzeppelin.com/defender/v2/tutorial/deploy
 */
async function main() {
  const [deployer] = await ethers.getSigners();
  const { network } = hardhatArguments;
  if (!network) {
    throw new Error("Please specify the target network. Aborting...");
  }

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log({
    address: deployer.address,
    balance,
  });

  // // Deploy the proxy contract
  const AIMEVerifierFactory = await ethers.getContractFactory("AIMEVerifier");
  const verifier = await AIMEVerifierFactory.deploy();
  await verifier.waitForDeployment();

  const verifierAddress = await verifier.getAddress();
  console.log({
    mseeage: "AIMEVerifier contract deployed at: ",
    verifierAddress,
  });

  const AIMEFactory = await ethers.getContractFactory("AIME");
  const aime = await AIMEFactory.deploy(verifierAddress);
  await aime.waitForDeployment();
  console.log({
    message: "AIME contract deployed at: ",
    aimeAddress: await aime.getAddress(),
  });

  const tx = await aime["mint(bytes,bytes,string,bytes)"](
    "0x00", // prompt
    "0x00", // aigcData
    "https://www.miladymaker.net/milady/json/1", // uri
    "0x00" // proof
  );
  const r = await tx.wait();
  console.log({
    r,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
