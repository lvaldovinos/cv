(function main(require) {
  const { App } = require('./Admin');
  const ReactDom = require('react-dom');
  const async = require('async');
  const { get } = require('superagent');
  const React = require('react');

  async.parallel([
    (callback) => {
      get('http://localhost:3002/projects')
      .then(({ body }) => callback(null, body.data))
      .catch(callback);
    },
    (callback) => {
      get('http://localhost:3002/companies')
      .then(({ body }) => callback(null, body.data))
      .catch(callback);
    },
    (callback) => {
      get('http://localhost:3002/skills')
      .then(({ body }) => callback(null, body.data))
      .catch(callback);
    },
  ], (err, [projects, companies, skills]) => {
    if (err) throw err;
    return ReactDom.render(<App
      projects={projects}
      companies={companies}
      skills={skills}
    />, document.getElementById('admin-app'));
  });
}(require));
