const { groth16 } = require("snarkjs");
const { generateProof } = require("./utils/generateProof.js");
const { verify } = require("./utils/verify.js");

async function main() {
    const { proof, publicSignals } = await generateProof(10);
    await verify(proof, publicSignals);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });