module.exports = {
    name: 'remove-indices',
    description: 'Document things from source instead of index',
    $runBefore: ['rendering-docs'],
    $process: (docs: any[]) => docs.filter((doc: any) => (!!doc.name && doc.id.indexOf('index') === -1))
};