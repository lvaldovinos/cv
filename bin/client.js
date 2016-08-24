#!/usr/bin/env node

const program = require('commander');
const async = require('async');
const is = require('../lib/is');
const fs = require('fs');
const core = require('../lib/core');
const path = require('path');
const config = require('my-config');
const winston = require('winston');
const packageJson = require('../package.json');
const JSONStream = require('JSONStream');

let couchdbConf = {};
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      showLevel: true,
      timestamp: true,
      level: 'info',
    }),
  ],
});

function error(msg) {
  logger.error(msg);
  process.exit(1);
}

function connectCouchdb(cb) {
  core
    .createConnection(couchdbConf)
    .once('error', error)
    .once('connect', cb);
}

function addCommand(document) {
  const documentMap = {
    company: core.Company,
    skill: core.Skill,
    project: core.Project,
  };
  const Document = documentMap[document];
  if (!Document) {
    error('Invalid add document');
  }
  if (!is.string(program.file)) {
    error('File is mandatory when creating new document');
  }
  const filePath = path
    .resolve(path.resolve(__dirname, '../'), program.file);
  const docStream = fs.createReadStream(filePath, {
    encoding: 'utf8',
  });
  docStream
    .on('error', error)
    .pipe(JSONStream.parse(true))
    .on('error', error)
    .on('data', (doc) => {
      let docs = [];
      if (!is.array(doc) && program.multiple) {
        return error('Send array of documents when sending multiple option');
      }
      // connect to couchdb instance
      if (!program.multiple) {
        docs.push(doc);
      } else {
        docs = doc;
      }
      return async.series([
        (callback) => connectCouchdb(callback),
        (callback) => {
          async.eachLimit(docs, 5, (data, cb) => {
            const newDoc = new Document(data);
            newDoc.create(cb);
          }, callback);
        },
      ], (err) => {
        if (err) return error(err);
        return logger.info(`${docs.length} new documents of ${document} type created`);
      });
    });
}

program
  .version(packageJson.version)
  .option('-e, --environment [value]', 'Environment to point to')
  .option('-f, --file [value]', 'File to upload')
  .option('-m, --multiple', 'Multiple documents');

program
  .command('add <document>')
  .description('Adds a new document into couchdb')
  .action(addCommand);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.help();
}

// environment option required
if (!is.string(program.environment)) {
  error('Environment is mandatory');
}

// load env settings
const configuration = config.init({
  path: path.resolve(__dirname, '../config.json'),
  env: program.environment,
});

couchdbConf = configuration.couchdb;

if (!is.object(couchdbConf)) {
  error('Invaild environment');
}
