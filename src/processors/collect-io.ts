import * as _ from 'lodash';
exports = {
    name: 'Collect IO',
    $runBefore: ['rendering-docs'],
    $process: (docs: any[]) => {
        docs.forEach((doc: any) => {
            if (doc.members && doc.members.length) {
                const [members, inputs, outputs]: any[] = [[],[],[]];

                _.forIn(doc.members, member => {

                    if (_.isUndefined(member.parameters)) {
                        member.isProperty = true;
                    }

                    if (member.decorators && member.decorators.length) {
                        _.forIn(member.decorators, decorator => {
                            switch (decorator.name) {
                                case 'Input':
                                    inputs.push(member);
                                    return false;
                                case 'Output':
                                    outputs.push(member);
                                    return false;
                            }
                        });
                    }

                });

                doc.members = members;
                doc.inputs = inputs;
                doc.outputs = outputs;
            }
        });
    }
};