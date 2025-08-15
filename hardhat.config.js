const { task } = require("hardhat/config");

require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@openzeppelin/hardhat-upgrades");

task("deploy", "Deploy contract").setAction(async () => {
  const deploy = require("./scripts/deploy");
  await deploy();
});

task("upgrade", "Upgrade contract").setAction(async () => {
  const upgrade = require("./scripts/upgrade");
  await upgrade();
});

task("deploy-checker", "Deploy BalanceChecker contract").setAction(async () => {
  const deploy = require("./scripts/deploy-checker");
  await deploy();
});

task("execute", "Execute contract").setAction(async () => {
  const execute = require("./scripts/execute");
  await execute();
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hyperevm",
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    hyperevm: {
      chainId: 999,
      url: "https://rpc.hyperliquid.xyz/evm",
      accounts: [process.env.PRIVATE_KEY],
      gasMultiplier: 1,
    },
  },
  etherscan: {
    apiKey: {
      hyperevm: process.env.hyperevm_API_KEY,
    },
    customChains: [
      {
        network: "hyperevm",
        chainId: 999,
        urls: {
          apiURL: "https://www.hyperscan.com/api",
          browserURL: "https://www.hyperscan.com/",
        },
      },
    ],
  },
  sourcify: {
    enabled: false
  }
};
