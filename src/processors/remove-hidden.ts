import * as _ from 'lodash';

function shouldShow(i: any) {
  return !i.private && !i.tags.tagsByName.get('hidden');
}

module.exports = {
  name: 'remove-hidden',
  description: 'Removes anything with @hidden tag',
  $runBefore: ['rendering-docs'],
  $process: (docs: any[]) => _(docs).filter(shouldShow).map(doc => {
    doc.members && _.filter(doc.members, shouldShow);
    doc.statics && _.filter(doc.statics, shouldShow);
    return doc;
  }).valueOf()
};
