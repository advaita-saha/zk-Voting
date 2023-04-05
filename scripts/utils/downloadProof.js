const appRoot = require('app-root-path');
const fs = require('fs');
//var QRCode = require('qrcode');

async function download(proof, filename) {
    var jsonObj = JSON.stringify(proof, null);
    
    try {
        //QRCode.toFile(`${appRoot}/${filename}.png`, jsonObj);
        fs.writeFileSync(`${appRoot}/${filename}.json`, jsonObj, 'utf8');
        console.log(`\n${filename} Successfully Downloaded\n`);
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = { download };