import Block from "../blockchain/Block";

const genesisBlock = new Block(0, new Date().toISOString(), [
  { sender: "System", receiver: "h662", amout: 100 },
]);

console.log("Mining block...");
genesisBlock.mineBlock(1);
console.log("Mined Block:", genesisBlock);
