const { groth16 } = require("snarkjs");
const { generateProof } = require("./utils/generateProof.js");
const { verify } = require("./utils/verify.js");
const { downloadProof } = require("./utils/downloadProof.js");

async function main() {
    const { proof, publicSignals } = await generateProof("0xF8Ce204a11f1f9e0e939eAd56fbda2f3223cDF79");
    downloadProof(proof);
    await verify(proof, publicSignals);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });