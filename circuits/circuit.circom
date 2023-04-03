pragma circom 2.1.5;

include "../node_modules/circomlib/circuits/poseidon.circom";
include "./merkleTree.circom";

template PoseidonHasher() {
    signal input in;
    signal input hash;

    component hasher = Poseidon(1);
    hasher.inputs[0] <== in;
    hash === hasher.out;
}

component main { public [hash] } = PoseidonHasher();