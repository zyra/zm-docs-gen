import { Config, DefaultConfig } from './models/config';
import * as _ from 'lodash';
const Package = require('dgeni').Package;
const path = require('path');

module.exports = (config: Config) => {

  config = _.mergeWith(DefaultConfig, config, (d, c) => {
    if (_.isArray(d)) return d.concat(c);
  });

  config.templateDir = path.resolve(__dirname, '../../../../', config.templateDir);
  config.outputFolder = path.resolve(__dirname, '../../../../', config.outputFolder);
  config.basePath = path.resolve(__dirname, '../../../../', config.basePath);

  const p = new Package('doc-generator', [
    require('dgeni-packages/jsdoc'),
    require('dgeni-packages/nunjucks'),
    require('dgeni-packages/typescript'),
    require('dgeni-packages/links')
  ]);


  p.processor(require('./processors/add-page-titles')(config.docTitle));

  // add processors
  _.forEach(config.processors, _p => p.processor(require('./processors/' + _p)));

  // add custom processors
  _.forEach(config.customProcessors, _p => p.processor(_p));

  // set log level
  p.config(function(log) {
    log.level = 'error';
  });

  // set path for each doc page
  p.config(function(computePathsProcessor) {
    computePathsProcessor.pathTemplates = [{
      docTypes: config.docTypes,
      getOutputPath: config.getOutputPath
    }];
  });

  // configure filters and template paths
  p.config(function(templateFinder, templateEngine) {
    _.forEach(config.filters, _f => templateEngine.filters.push(require('./filters/' + _f)));
    templateFinder.templateFolders = [config.templateDir];
    templateFinder.templatePatterns = config.templates;
  });

  // configure tags
  p.config(function(parseTagsProcessor) {
    _.forEach(config.tags, name => parseTagsProcessor.tagDefinitions.push({ name }));
  });

  p.config(function(readFilesProcessor, readTypeScriptModules) {
    readFilesProcessor.$enabled = false;
    readFilesProcessor.basePath = config.basePath;
    readTypeScriptModules.basePath = config.basePath;
    readTypeScriptModules.sourceFiles = config.sourceFiles;
  });

  p.config(function(writeFilesProcessor) {
    writeFilesProcessor.outputFolder = config.outputFolder;
  });

  return p;

};
