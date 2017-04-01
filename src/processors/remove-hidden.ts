import * as _ from 'lodash';

function filterMembers(doc: any) {
  console.log('Filtering ~~~', doc.name);
  doc.members = doc.members.filter(shouldShow);
  doc.statics = doc.statics.filter(shouldShow);
  return doc;
}

function shouldShow(doc: any) {
  return !doc.private && !doc.tags || !doc.tags.tagsByName.get('hidden');
}

module.exports = {
  name: 'remove-hidden',
  description: 'Removes anything with @hidden tag',
  $runBefore: ['rendering-docs'],
  $process: (docs: any[]) => {

    docs = docs.filter(doc => !doc.private && (!doc.tags || !doc.tags.tagsByName.get('hidden')));

    docs = docs.map(doc => {
      if (doc.members) {
        doc.members.filter(member => !member.tags.tagsByName.get('hidden'));
      }

      if (doc.statics) {
        doc.statics.filter(stat => !stat.tags.tagsByName.get('hidden'));
      }

      return doc;
    });

    return docs;

    // return _.map(docs, doc => {
    //   const res = doc.moduleDoc.exports.filter(i => shouldShow(i)).map(i => filterMembers(i));
    //   return res;
    // });
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
