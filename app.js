const readline = require('readline');
var CardboardService = require("./cardboard.js");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Veuillez renseigner une chaîne d\'articles :', (chaine) => {
    let optimizedChaine = CardboardService.generateListCardboard(chaine);
    let regex = new RegExp('/+', 'gi');
    let numberCardboard = optimizedChaine.match(regex).length + 1;
    console.log(`La chaîne d'articles emballés est composée de ${numberCardboard} cartons : ${optimizedChaine}`);
    rl.close();
});
