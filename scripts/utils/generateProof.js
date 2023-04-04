const { groth16 } = require("snarkjs");
const circomlibjs = require("circomlibjs");
const appRoot = require('app-root-path');
const { voters } = require(`${appRoot}/votersList.json`);
const voter = require(`${appRoot}/voter.json`);
const merkle = require("./merkleTree.js");

async function generateProof(addr){
    if(voter[addr] == undefined){
        addr = "0x0000000000000000000000000000000000000000" // 0 address
    }
    const poseidon = await circomlibjs.buildPoseidonOpt();

    leafHash = function(input) {
        return poseidon([input]);
    }

    nodeHash = function(left, right) {
        return poseidon([left, right]);
    }

    let inputs = new Array(2**4);
    for (let i = 0; i < inputs.length; i++) {
        if(i < voters.length){
            inputs[i] = voters[i];
        } else {
            inputs[i] = voters[voters.length - 1];
        }
    }

    let tree = await merkle.merkleTree(inputs, leafHash, nodeHash);
    console.log("-------------- Merkle Tree ------------------");
    console.log("Root: ", poseidon.F.toObject(tree.root));


    let merkleproof = tree.getMerkleProof(voter[addr]);
    console.log("-------------- Merkle Proof ------------------");
    // convert lemma into prime field elements
    merkleproof.lemma = merkleproof.lemma.map((x) => poseidon.F.toString(x));
    //merkleproof.path = convert(merkleproof.path);
    console.log(merkleproof.lemma);
    

    const { proof, publicSignals } = await groth16.fullProve(
        { 
            lemma: merkleproof.lemma, 
            path: merkleproof.circompath,
        },
        `${appRoot}/circuits/build/circuit_js/circuit.wasm`,
        `${appRoot}/circuits/build/keys/circuit_0000.zkey`
    );
    console.log("-------------- Public Signals (pp) ------------------");
    console.log(publicSignals);
    console.log("---------------- Proof (pi) ----------------");
    console.log(proof);

    return { proof, publicSignals };
}

module.exports = { generateProof };
// generateProof("0x2fc2dFbD4a3bAaC9b2C1fE7d7Bb7e505a4c5D447")
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });