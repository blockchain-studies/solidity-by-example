import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

const TEXT = "Todo SmartContract";
const TEXT_UPDATED = "Todo SmartContract II";
const COMPLETED = true;
const NOT_COMPLETED = false;
const INDEX = 0n;
const TODO_CONTRACT = "Todos";

describe(TODO_CONTRACT, function () {
  async function deployFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const contract = await hre.viem.deployContract(TODO_CONTRACT);

    const publicClient = await hre.viem.getPublicClient();

    return {
      contract,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Should create a todo successfully", async function () {
      const { contract } = await loadFixture(deployFixture);

      expect(await contract.write.create([TEXT]));
    });

    it("Should get a todo successfully", async function () {
      const { contract } = await loadFixture(deployFixture);

      expect(await contract.write.create([TEXT]));

      const [text, completed] = await contract.read.get([INDEX]);

      expect(text).is.equal(TEXT);
      expect(completed).is.equal(NOT_COMPLETED);
    });

    it("Should update the text of the todo successfully", async function () {
      const { contract } = await loadFixture(deployFixture);

      // Before update the text
      expect(await contract.write.create([TEXT]));

      const [text, completed] = await contract.read.get([INDEX]);

      expect(text).is.equal(TEXT);
      expect(completed).is.equal(NOT_COMPLETED);

      // Updating the text
      expect(await contract.write.updateText([INDEX, TEXT_UPDATED]));

      // After update the text
      const [textUdated, completedAgain] = await contract.read.get([INDEX]);

      expect(textUdated).is.equal(TEXT_UPDATED);
      expect(completedAgain).is.equal(NOT_COMPLETED);
    });

    it("Should complete a todo successfully", async function () {
      const { contract } = await loadFixture(deployFixture);

      // Before complete the todo
      expect(await contract.write.create([TEXT]));

      const [text, completed] = await contract.read.get([INDEX]);

      expect(text).is.equal(TEXT);
      expect(completed).is.equal(NOT_COMPLETED);

      // Completing the todo
      expect(await contract.write.toggleCompleted([INDEX]));

      // After complete the todo
      const [textUdated, completedAgain] = await contract.read.get([INDEX]);

      expect(textUdated).is.equal(TEXT);
      expect(completedAgain).is.equal(COMPLETED);
    });
  });
});
