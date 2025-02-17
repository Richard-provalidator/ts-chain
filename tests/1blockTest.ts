import Block from "../blockchain/Block";

const genesisBlock = new Block(0, new Date().toISOString(), [
  {
    sender: "System",
    receiver: "h662",
    amount: 100,
  },
]);

console.log("Genesis Block:", genesisBlock);
