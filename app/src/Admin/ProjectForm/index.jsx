const React = require('react');
const LocationForm = require('../LocationForm');
const { DateRangePicker } = require('react-dates');

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      startDate: null,
      finishDate: null,
      client: '',
      location: {},
      description: '',
      duty: '',
      duties: [],
      focusInput: null,
      company: '',
      skills: [],
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDatesChange = this.handleDatesChange.bind(this);
    this.handleClientChange = this.handleClientChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDutiesChange = this.handleDutiesChange.bind(this);
    this.handleDutyChange = this.handleDutyChange.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
  }
  handleNameChange({ target }) {
    this.setState({
      name: target.value,
    });
  }
  handleDatesChange({ startDate, endDate }) {
    this.setState({
      startDate,
      finishDate: endDate,
    });
  }
  handleClientChange({ target }) {
    this.setState({
      client: target.value,
    });
  }
  handleFocusChange(focusInput) {
    this.setState({ focusInput });
  }
  handleLocationChange(location) {
    this.setState({ location });
  }
  handleDescriptionChange({ target }) {
    this.setState({
      description: target.value,
    });
  }
  handleDutiesChange() {
    const { duties } = this.state;
    let { duty } = this.state;
    duties.push(duty);
    duty = '';
    this.setState({ duties, duty });
  }
  handleDutyChange({ target }) {
    this.setState({
      duty: target.value,
    });
  }
  handleCompanyChange({ target }) {
    this.setState({
      company: target.value,
    });
  }
  render() {
    const { name, client, description, duties, duty } = this.state;
    const dutiesHtml = duties.map((d, i) => (<li className="list-group-item" key={i}>{d}</li>));
    const { companies, skills } = this.props;
    const companyOptions = companies.rows
      .map((c) => (<option key={c.id} value={c.id}>{c.name}</option>));
    const firstCompanyOptionId = companies.rows[0].id;
    return (
      <form className="row">
        <div className="form-group col-md-6">
          <label htmlFor="projectName">Name:</label>
          <input
            id="projectName"
            type="text"
            className="form-control"
            placeholder="Project's name"
            onChange={this.handleNameChange}
            value={name}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="projectClient">Client:</label>
          <input
            id="projectClient"
            type="text"
            className="form-control"
            placeholder="Project's client"
            onChange={this.handleClientChange}
            value={client}
          />
        </div>
        <div className="form-group col-md-6">
          <DateRangePicker
            onDatesChange={this.handleDatesChange}
            onFocusChange={this.handleFocusChange}
            startDate={this.state.startDate}
            endDate={this.state.finishDate}
            focusedInput={this.state.focusInput}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="projectCompany">Company:</label>
          <select
            className="form-control"
            id="projectCompany"
            value={firstCompanyOptionId}
            onChange={this.handleCompanyChange}
          >
            {companyOptions}
          </select>
        </div>
        <div className="col-md-12">
          <LocationForm onChange={this.handleLocationChange} />
        </div>
        <div className="col-md-12 form-group">
          <label htmlFor="projectDescription">Description:</label>
          <textarea
            rows="5"
            id="projectDescription"
            value={description}
            className="form-control"
            onChange={this.handleDescriptionChange}
            placeholder="Project's description"
          />
        </div>
        <div className="form-group col-md-12">
          <label htmlFor="projectDuty">Duty:</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="projectDuty"
              value={duty}
              placeholder="Project's duty"
              onChange={this.handleDutyChange}
            />
            <span className="input-group-btn">
              <button
                className="btn btn-default"
                type="button"
                onClick={this.handleDutiesChange}
              >
                Add
              </button>
            </span>
          </div>
        </div>
        <div className="col-md-12">
          <ul className="list-group">
            {dutiesHtml}
          </ul>
        </div>
      </form>
    );
  }
}

ProjectForm.propTypes = {
  companies: React.PropTypes.object,
  skills: React.PropTypes.object,
};

module.exports = ProjectForm;
