import * as _ from 'lodash';

export interface Config {
  processors: string[];
  filters: string[];
  docTypes: string[];
  templateDir?: string;
  templates?: string[];
  tags: string[];
  outputFolder?: string;
  sourceFiles?: string;
  basePath?: string;
  getOutputPath?: Function;
  docTitle?: string;
  customProcessors?: any[];
}

export const DefaultConfig: Config = {
  docTypes: ['class', 'interface'],
  processors: ['remove-indices', 'remove-hidden', 'collect-io'],
  filters: ['dump', 'marked'],
  tags: ['hidden', 'usage'],
  basePath: './',
  getOutputPath: doc => _.kebabCase(doc.name) + '/index.html'
};
