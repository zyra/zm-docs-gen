function shouldShow(doc: any) {
  if (doc.tags.tagsByName.get('hidden')) {
    return false;
  }
  doc.members = doc.members.filter((member: any) => !member.tags.tagsByName.get('hidden'));
  doc.statics = doc.statics.filter((method: any) => !method.tags.tagsByName.get('hidden'));
  return true;
}

module.exports = {
  name: 'remove-hidden',
  description: 'Removes anything with @hidden tag',
  $runBefore: ['rendering-docs'],
  $process: (docs: any[]) => docs.filter((doc: any) => {
    if (shouldShow(doc)) {
      doc.moduleDoc.exports = doc.moduleDoc.exports.filter((doc: any) => shouldShow(doc));
      return true;
    } else {
      return false;
    }
  })
};
