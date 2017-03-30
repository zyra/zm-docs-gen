module.exports = {
    name: 'remove-hidden',
    description: 'Removes anything with @hidden tag',
    $runBefore: ['rendering-docs'],
    $process: (docs: any[]) => docs.filter((doc: any) => {

        doc.moduleDoc.exports = doc.moduleDoc.exports.filter((doc: any) => {
            if (doc.tags.tagsByName.get('hidden')) {
                return false;
            }
            doc.members = doc.members.filter((member: any) => !member.tags.tagsByName.get('hidden'));
            doc.statics = doc.statics.filter((method: any) => !method.tags.tagsByName.get('hidden'));
            return true;
        });

        return true;
    })
};