const circomlibjs = require("circomlibjs");

async function registerVoter(root, addr) {
    const poseidon = await circomlibjs.buildPoseidonOpt();
    const addrHash = poseidon([addr]);
    return poseidon.F.toString(poseidon([root, addrHash]));
}

module.exports = { registerVoter };