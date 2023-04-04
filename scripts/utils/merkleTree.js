/**
 * @typedef {Object} MerkleTree
 * @property {Array<any>} inputs Leaves of the tree. Type depends on hash function.
 * @property {Array<any>} nodes Nodes of the Merkle tree. Type depends on hash function.
 * @property {Number} depth Depth of the Merkle tree.
 * @property {{readonly root: *}} root Root of the Merkle tree.
 */
/**
 * Creates a Merkle tree object from the given input, which can create and validate Merkle proofs.
 * @param {Array<any>} input Leafs of the merkle Tree
 * @param {Function} leafHash Takes one input (leaf) and hashes it
 * @param {Function} nodeHash Takes two inputs (left and right node and hashes it
 * @returns {MerkleTree} a Merkle tree with functionalities
 */
async function merkleTree(input, leafHash, nodeHash) {

    /**
     * Calculates all nodes of the Merkle tree
     */
    function calculateNodes() {
        let nodes = [];
        for (let i of merkle.inputs) {
            nodes.push(merkle.leafHash(i));
        }
        let width = nodes.length;
        width >>= 1;
        let offset = 0;
        while (width > 0) {
            for (let i = 0; i < width; i++) {
                let j = 2 * i + offset;
                nodes.push(merkle.nodeHash(nodes[j], nodes[j + 1]));
            }
            offset += width * 2;
            width >>= 1;
        }
        return nodes;
    }

    /**
     * Returns the root of the Merkle tree.
     * @returns {*} root. Type depends on the hash function
     */
    function getRoot() {
        return merkle.nodes[merkle.nodes.length - 1];
    }

    /**
     * @typedef {Object} MerkleProof
     * @property {Array<Number>} proof.circompath Path describes whenever lemma should hashed be left (0) or right (1)
     * @property {Array<any>} proof.lemma Lemma contains alle required Merkle nodes. Type depends on hash function.
     * @property {Function} proof.validate Function to recalculate the Merkle proof for validation purpose.
     */

    /**
     * Creates a Merkle proof from tree
     * @param {number} index Index in the tree for the generation of the Merkle proof
     * @returns {MerkleProof} proof
     */
    function getMerkleProof(index) {

        /**
         * Recalculates the Merkle proof and returns the Merkle root
         * @returns {MerkleTree.} Merkle root
         */
        function calculateRoot() {
            let hash = proof.lemma[0];
            for (let i = 0; i < proof.path.length; i++) {
                if (proof.path[i]) {
                    hash = merkle.nodeHash(this.lemma[i + 1], hash);
                } else {
                    hash = merkle.nodeHash(hash, this.lemma[i + 1]);
                }
            }
            return hash;
        }

        if (merkle.inputs.length <= index) throw "No valid in index";
        let path = new Uint8Array(merkle.depth).fill(0);
        let base2 = (index).toString(2);
        for (let i = 0; i < base2.length; i++) {
            path[i] = Number(base2[base2.length - i - 1]);
        }
        let lemma = [merkle.nodes[index]];
        let offset = 0;
        let pos = index;
        let width = merkle.inputs.length;
        for (let i = 0; i < merkle.depth; i++) {
            if (path[i]) {
                lemma.push(merkle.nodes[offset + pos - 1]);
            } else {
                lemma.push(merkle.nodes[offset + pos + 1]);
            }
            pos >>= 1;
            offset += width;
            width >>= 1;
        }
        lemma.push(merkle.getRoot());

        let proof = {};
        proof.path = path;
        proof.lemma = lemma;
        proof.calculateRoot = calculateRoot;
        proof.circompath = [];

        for(let i = 0; i < proof.path.length; i++){
            proof.circompath.push(proof.path[i]);
        }

        return proof;
    }


    let merkle = {};

    Object.defineProperty(merkle, 'root', {get() { return merkle.nodes[merkle.nodes.length - 1]}});

    merkle.nodeHash = nodeHash;
    merkle.leafHash = leafHash;
    merkle.inputs = [...input]; //Creates deep copy of array
    merkle.depth = Math.log2(merkle.inputs.length);
    merkle.nodes = [];

    merkle.calculateNodes = calculateNodes;
    merkle.getRoot = getRoot;
    merkle.getMerkleProof = getMerkleProof;

    merkle.nodes = calculateNodes();

    return merkle;
}

module.exports = { merkleTree };