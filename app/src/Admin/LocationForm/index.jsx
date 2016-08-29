const React = require('react');

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      zip: '',
      city: '',
      state: '',
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }
  handleAddressChange({ target }) {
    this.setState({
      address: target.value,
    });
    this.props.onChange(this.state);
  }
  handleZipChange({ target }) {
    this.setState({
      zip: target.value,
    });
    this.props.onChange(this.state);
  }
  handleCityChange({ target }) {
    this.setState({
      city: target.value,
    });
    this.props.onChange(this.state);
  }
  handleStateChange({ target }) {
    this.setState({
      state: target.value,
    });
    this.props.onChange(this.state);
  }
  render() {
    const { address, zip, city, state } = this.state;
    return (
      <div className="row">
        <div className="form-group col-md-6">
          <label htmlFor="locationAddress">Address:</label>
          <input
            type="text"
            id="locationAddress"
            className="form-control"
            placeholder="Location address"
            value={address}
            onChange={this.handleAddressChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="locationZip">Zip:</label>
          <input
            type="text"
            id="locationZip"
            className="form-control"
            placeholder="Location zip"
            value={zip}
            onChange={this.handleZipChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="locationCity">City:</label>
          <input
            type="text"
            id="locationCity"
            className="form-control"
            placeholder="Location city"
            value={city}
            onChange={this.handleCityChange}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="locationState">State:</label>
          <input
            type="text"
            id="locationState"
            className="form-control"
            placeholder="Location state"
            value={state}
            onChange={this.handleStateChange}
          />
        </div>
      </div>
    );
  }
}

LocationForm.propTypes = {
  onChange: React.PropTypes.func,
};

module.exports = LocationForm;
