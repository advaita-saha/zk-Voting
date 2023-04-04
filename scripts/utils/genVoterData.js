const appRoot = require('app-root-path');
const fs = require('fs');
const { voters } = require(`${appRoot}/votersList.json`);

let voter = {};
for(let i = 0; i < voters.length; i++){
    voter[voters[i]] = i;
}

var jsonObj = JSON.stringify(voter, null, 4);
fs.writeFile(`${appRoot}/voter.json`, jsonObj, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log("\nVoter Data have been generated\n");
});