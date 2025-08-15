const hre = require("hardhat");
const { ethers } = hre;
const ContractArtifact = require("../artifacts/contracts/NomisScore.sol/NomisScore.json");
const secrets = require("../secrets.json");

async function main() {
  const contractName = "NomisScore";
  const CONTRACT_ADDRESS = "";
  console.log("Executing " + contractName + "...");

  await hre.run("compile");

  const provider = new ethers.JsonRpcProvider(hre.userConfig.networks?.karak?.["url"]);
  const signer = new ethers.Wallet(secrets.deployer, provider);

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    ContractArtifact.abi,
    signer
  );

  const contractBalance = await provider.getBalance(CONTRACT_ADDRESS);
  console.log(`Contract balance:`, contractBalance);

  console.log(`name:`, await contract.name());
  console.log(`symbol:`, await contract.symbol());

  //const tx = await contract.transferOwnership("0x8535156C75750d79ee0D9829c5D4Ae6f5D9DbCB5");
  //console.log(`Tx hash`, tx.hash);
  console.log(`owner:`, await contract.owner());

  //const tx = await contract.setMintFee(3000000000000000n);
  //console.log(`Tx hash`, tx.hash);
  console.log(`Mint fee:`, await contract.getMintFee());

  //const tx1 = await contract.setUpdateFee(1500000000000000n);
  //console.log(`Tx hash`, tx1.hash);
  console.log(`Update fee:`, await contract.getUpdateFee());

  //const tx = await contract.setCalcModelsCount(12);
  //console.log(`Tx hash`, tx.hash);
  console.log(`Calculation models count:`, await contract.getCalcModelsCount());

  //const tx = await contract.setFreeMints(0);
  //console.log(`Tx hash`, tx.hash);
  console.log(`Free mints (calcModel = 11):`, await contract.getFreeMints(11));

  //const tx2 = await contract.setReferralReward(300000000000000n);
  //console.log(`Tx hash`, tx2.hash);
  console.log(`Referral reward:`, await contract.getReferralReward());
}

module.exports = main;