import { ec as EC } from "elliptic";
import * as crypto from "crypto";

const ec = new EC("secp256k1");

export interface WalletData {
  privateKey: string;
  publicKey: string;
  address: string;
}

class Wallet implements WalletData {
  privateKey: string;
  publicKey: string;
  address: string;

  constructor() {
    const keyPair = ec.genKeyPair();
    this.privateKey = keyPair.getPrivate("hex");
    this.publicKey = keyPair.getPublic("hex");

    this.address = crypto
      .createHash("sha256")
      .update(this.publicKey)
      .digest("hex");
  }

  signTransaction(data: string): string {
    console.log("wallet", data);
    const keyPair = ec.keyFromPrivate(this.privateKey, "hex");
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    const signature = keyPair.sign(hash, "base64");
    return signature.toDER("hex");
  }

  static verifySignature(
    publicKey: string,
    data: string,
    signature: string
  ): boolean {
    const keyPair = ec.keyFromPublic(publicKey, "hex");
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    return keyPair.verify(hash, signature);
  }

  toString(): string {
    return JSON.stringify(this);
  }

  static fromJSON(data: WalletData): Wallet {
    return new Wallet();
  }
}

export default Wallet;
