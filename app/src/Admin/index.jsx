const React = require('react');
const ReactDomServer = require('react-dom/server');
const ProjectForm = require('../../lib/Admin/ProjectForm');

class AdminApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: props.projects,
      companies: props.companies,
      skills: props.skills,
    };
  }
  render() {
    const { companies, skills } = this.state;
    return (
      <div className="container">
        <ProjectForm
          companies={companies}
          skilss={skills}
        />
      </div>
    );
  }
}

AdminApp.propTypes = {
  projects: React.PropTypes.object,
  companies: React.PropTypes.object,
  skills: React.PropTypes.object,
};

module.exports = {
  App: AdminApp,
  html: ({ projects, companies, skills }) => ReactDomServer
    .renderToString(<AdminApp
      projects={projects}
      companies={companies}
      skilss={skills}
    />),
};
