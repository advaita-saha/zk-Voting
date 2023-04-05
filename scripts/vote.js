const appRoot = require('app-root-path');
const { verify } = require("./utils/verify.js");
const { download } = require("./utils/downloadProof.js");
const { proof, publicSignals } = require(`${appRoot}/ticket.json`);
const result = require(`${appRoot}/result.json`);

async function vote(vote) {
    if(result["spentTickets"][publicSignals[1]] != 1 && await verify(proof, publicSignals)){
        result["votes"][vote] += 1;
        result["votingID"] = publicSignals[0];
        result["spentTickets"][publicSignals[1]] = 1;
        download(result, "result");
        console.log("Vote casted successfully");
    } else {
        console.log("Vote failed, wrong ticket or already spent ticket");
    }
}

vote("a")
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });