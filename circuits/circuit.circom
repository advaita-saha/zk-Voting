pragma circom 2.1.5;

include "../node_modules/circomlib/circuits/poseidon.circom";
include "./merkleTree.circom";


component main { public [path] } = MerkleProof(4);