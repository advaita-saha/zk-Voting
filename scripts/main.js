const { generateProof } = require("./utils/generateProof.js");
const { verify } = require("./utils/verify.js");

async function main() {
  const { proof, publicSignals } = await generateProof("0xF8Ce204a11f1f9e0e939eAd56fbda2f3223cDF79");
  await verify(proof, publicSignals);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });