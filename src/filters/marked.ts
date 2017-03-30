import * as marked from 'marked';
exports = {
    name: 'marked',
    process: (code: any) => {
        return marked(code, { langPrefix: 'rounded ' });
    }
};