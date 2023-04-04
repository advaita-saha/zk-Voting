const appRoot = require('app-root-path');
const fs = require('fs');
const { voters } = require(`${appRoot}/votersList.json`);
const { download } = require("./downloadProof.js");

let voter = {};
for(let i = 0; i < voters.length; i++){
    voter[voters[i]] = i;
}
download(voter, "voter");