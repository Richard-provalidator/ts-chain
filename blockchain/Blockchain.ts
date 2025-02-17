import Block from "./Block";
import Transaction from "./Transaction";

class Blockchain {
  chain: Block[];
  difficulty: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 3;
  }

  private createGenesisBlock(): Block {
    return new Block(0, [], "");
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(transactions: Transaction[]): void {
    const newBlock = new Block(
      this.chain.length,
      transactions,
      this.getLatestBlock().hash
    );

    console.log("Mining new block...");
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousHash = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        console.log(`Block ${currentBlock.index} has been tampered with.`);
        return false;
      }

      if (currentBlock.previousHash !== previousHash.hash) {
        console.log(
          `Blcok ${currentBlock.index} is not linked to the previous block.`
        );
        return false;
      }
    }

    return true;
  }
}

export default Blockchain;
