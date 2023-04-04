pragma circom 2.1.5;

include "../node_modules/circomlib/circuits/poseidon.circom";
include "./merkleTree.circom";

template Vote(depth) {
    signal input votingID;

    signal input lemma[depth+2];
    signal input path[depth];
    signal input nullifier;

    component merkleProof = MerkleProof(depth);
    component poseidon = Poseidon(2);

    merkleProof.lemma <== lemma;
    merkleProof.path <== path;

    poseidon.inputs[0] <== votingID;
    poseidon.inputs[1] <== lemma[0];

    poseidon.out === nullifier;

}

component main { public [votingID, nullifier] } = Vote(10);