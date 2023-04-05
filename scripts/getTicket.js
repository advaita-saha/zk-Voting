const { generateProof } = require('./utils/generateProof.js');
const { download } = require('./utils/downloadProof.js');

async function main() {
    const { proof, publicSignals } = await generateProof("0x8f6fFfF8f7dDeB9b2C1fE7d7Bb7e505a4c5D4478");
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