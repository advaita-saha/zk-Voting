const { generateProof } = require('./utils/generateProof.js');
const { download } = require('./utils/downloadProof.js');
const prompt = require('prompt-sync')();

async function main() {
  const addr = prompt('Enter your account address: ');
  const { proof, publicSignals } = await generateProof(addr);
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