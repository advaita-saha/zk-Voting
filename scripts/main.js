const { groth16 } = require("snarkjs");
const { generateProof } = require("./utils/generateProof.js");
const { verify } = require("./utils/verify.js");

async function main() {
    const { proof, publicSignals } = await generateProof("0x3c1cBdC9b2b1b4BbB4C1cBdC9b2b1b4Bbv4C1cBd");
    await verify(proof, publicSignals);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });