const appRoot = require('app-root-path');
const fs = require('fs');

function downloadProof(proof) {
    var jsonObj = JSON.stringify(proof, null, 4);
    fs.writeFile(`${appRoot}/proof.json`, jsonObj, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("\nProof have been successfully downloaded\n");
    });
}

module.exports = { downloadProof };