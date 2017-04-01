import * as _ from 'lodash';

function filterMembers(doc: any) {
  doc.members = doc.members.filter((member: any) => !member.tags.tagsByName.get('hidden'));
  doc.statics = doc.statics.filter((method: any) => !method.tags.tagsByName.get('hidden'));
  return doc;
}

function shouldShow(doc: any) {
  return !doc.tags || !!doc.tags.tagsByName.get('hidden');
}

module.exports = {
  name: 'remove-hidden',
  description: 'Removes anything with @hidden tag',
  $runAfter: ['tags-parsed'],
  $runBefore: ['rendering-docs'],
  $process: (docs: any[]) => {
    return _(docs).filter(shouldShow).map(filterMembers).valueOf();
    // docs.filter((doc: any) => {
    //   if (shouldShow(doc)) {
    //     doc.moduleDoc.exports = doc.moduleDoc.exports.filter((doc: any) => shouldShow(doc));
    //     return true;
    //   } else {
    //     return false;
    //   }
    // })
  }
};
