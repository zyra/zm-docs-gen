#!/usr/bin/env node
const path = require('path');
try {
    const [Dgeni, config] = [require('dgeni'), require(path.resolve(__dirname, '../../../../docs.config.js'))];
    const dgeniPackage = require('./dgeni-package')(config);
    try {
        new Dgeni([dgeniPackage])
            .generate()
            .then((docs: any) => console.log(`${docs.length} docs generated.`));
    } catch (e) {
        console.log('Error generating docs.');
        console.log(e);
    }
} catch (e) {
    console.log('Config was not found or invalid');
    console.log(e);
}
