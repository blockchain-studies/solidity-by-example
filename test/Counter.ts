import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

const ZERO_COUNT = 0n;
const ONE_COUNT = 1n;

describe("Counter", function () {
  async function deployCounterFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const counter = await hre.viem.deployContract("Counter");

    const publicClient = await hre.viem.getPublicClient();

    return {
      counter,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Should validate if the initial of counter is equal zero", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      expect(await counter.read.get()).to.equal(ZERO_COUNT);
    });

    it("Should increment the counter successfully", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      expect(await counter.write.inc());

      expect(await counter.read.get()).to.equal(ONE_COUNT);
    });

    it("Should decrement the counter successfully", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      expect(await counter.write.inc()); // 0 + 1 = 1
      expect(await counter.write.inc()); // 1 + 1 = 2

      expect(await counter.write.dec()); // 2 - 1 = 1

      expect(await counter.read.get()).to.equal(ONE_COUNT);
    });

    it("Should garantee the counter will never be less than zero", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      
      expect(await counter.write.dec());

      expect(await counter.read.get()).to.equal(ZERO_COUNT);
    });
  });
});