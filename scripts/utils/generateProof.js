const { groth16 } = require("snarkjs");
const circomlibjs = require("circomlibjs");
const appRoot = require('app-root-path');
const voter = require(`${appRoot}/voter.json`);
const merkle = require("./merkleTree.js");
const { initiatePoll } = require("./initiatePoll.js");
const { registerVoter } = require("./registerVoter.js");

async function generateProof(addr){
    if(voter[addr] == undefined){
        console.log("Invalid Voter");
        process.exit(1);
    }
    const poseidon = await circomlibjs.buildPoseidonOpt();

    let tree = await initiatePoll();
    let root = poseidon.F.toString(tree.root);
    let vid = await registerVoter(root, addr);


    let merkleproof = tree.getMerkleProof(voter[addr]);
    console.log("-------------- Merkle Proof ------------------");
    merkleproof.lemma = merkleproof.lemma.map((x) => poseidon.F.toString(x));
    console.log(merkleproof.lemma);
    

    const { proof, publicSignals } = await groth16.fullProve(
        {
            votingID: root,
            lemma: merkleproof.lemma, 
            path: merkleproof.circompath,
            nullifier: vid
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