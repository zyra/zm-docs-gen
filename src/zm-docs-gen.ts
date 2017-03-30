try {
    const [Dgeni, config] = [require('dgeni'), require('../../../docs.config.js')];
    new Dgeni(config.dgeniConfig)
        .generate()
        .then((docs: any) => console.log(`${docs.length} docs generated.`));
} catch (e) {
    console.log('Config was not found or invalid');
}
