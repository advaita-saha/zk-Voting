const { generateProof } = require('./utils/generateProof.js');
const { download } = require('./utils/downloadProof.js');

async function main() {
    const { proof, publicSignals } = await generateProof("0xF8Ce204a11f1f9e0e939eAd56fbda2f3223cDF79");
    let ticket = {
        proof: proof,
        publicSignals: publicSignals
    };
    await download(ticket, "ticket");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });