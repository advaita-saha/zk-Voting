const appRoot = require('app-root-path');
const { verify } = require("./utils/verify.js");
const { proof, publicSignals } = require(`${appRoot}/ticket.json`);

async function main() {
    if(await verify(proof, publicSignals)){
        console.log("Vote casted successfully");
    } else {
        console.log("Vote failed, wrong ticket");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });