import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

const ZERO_COUNT = 0n;
const ONE_COUNT = 1n;
const CONTRACT = "SimpleStorage";

describe(CONTRACT, function () {
  async function deployFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const contract = await hre.viem.deployContract(CONTRACT);

    const publicClient = await hre.viem.getPublicClient();

    return {
      contract,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Should validate if the initial value is equal zero", async function () {
      const { contract } = await loadFixture(deployFixture);
      
      expect(await contract.read.get()).to.equal(ZERO_COUNT);
    });

    it("Should storage value successfully", async function () {
      const { contract } = await loadFixture(deployFixture);
      
      expect(await contract.write.set([ONE_COUNT]));

      expect(await contract.read.get()).to.equal(ONE_COUNT);
    });
  });
});
