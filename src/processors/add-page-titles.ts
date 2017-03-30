module.exports = function addDocsTitle(docsTitle: string) {
    return {
        name: 'add-page-titles',
        description: 'Adds page titles to docs',
        $runBefore: ['rendering-docs'],
        $process: (docs: any[]) => {
            docs = docs.filter(doc => !!doc.name && !!doc.outputPath);
            docs.forEach(doc => doc.pageTitle = doc.name + ' | ' + docsTitle);
            return docs;
        }
    };
};