# A Sample Circom Project 

Circom is a programming language and a toolchain for building and verifying zero-knowledge proofs (ZKPs). Zero-knowledge proofs are cryptographic protocols that allow a prover to demonstrate the validity of a statement to a verifier without revealing any additional information beyond the truth of the statement itself. Circom allows developers to write ZKP circuits using a high-level language and then compile them to a low-level representation that can be used to generate proofs. Circom is often used in combination with other tools and languages such as SnarkJS, which is a JavaScript library for creating and verifying ZKPs, and Solidity, which is a smart contract language used for building decentralized applications on the Ethereum blockchain.

### Run the following commands to run the project

- Install rust
```bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```
- Install circom
```bash
git clone https://github.com/iden3/circom.git
cd circom
cargo build --release
cargo install --path circom
```
- Install snarkjs
```bash
npm install -g snarkjs
```
- Clone this repository and then run the following commands
```bash
npm i
npm run build
npm run setup
npm run verify
npm run generateVerifier
```
- To clean the existing build files
```bash
npm run clean
```
