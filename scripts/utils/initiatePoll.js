const circomlibjs = require("circomlibjs");
const appRoot = require('app-root-path');
const { voters } = require(`${appRoot}/votersList.json`);
const merkle = require("./merkleTree.js");

async function initiatePoll(){
    const poseidon = await circomlibjs.buildPoseidonOpt();

    leafHash = function(input) {
        return poseidon([input]);
    }

    nodeHash = function(left, right) {
        return poseidon([left, right]);
    }

    let inputs = new Array(2**10);
    for (let i = 0; i < inputs.length; i++) {
        if(i < voters.length){
            inputs[i] = voters[i];
        } else {
            inputs[i] = voters[voters.length - 1];
        }
    }

    let tree = await merkle.merkleTree(inputs, leafHash, nodeHash);
    console.log("-------------- Merkle Tree ------------------");
    console.log("Root: ", poseidon.F.toString(tree.root));

    return tree;
}

module.exports = { initiatePoll };