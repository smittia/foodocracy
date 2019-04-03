import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { trigger_new } from '../../library/api'
import DateTimePicker from 'react-datetime-picker'

const LOCATIONS = {
  "uk" : ["51.457890", "-0.975700"],
  "hague" : ["52.065332", "4.344308"]
}

class New extends React.Component {
  constructor(props) {
    super(props);
    this.props = props
    let date = new Date();
    date.setHours(date.getHours()+2)
    this.state = {"name" : "", "date": date, "lat" : "51.457890", "long" : "-0.975700", "custom" : false};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleSubmit(event) {

    let props = this.props
    let update_function = function (response) {
      console.log("hi");

      // redirect to main page
      props.returnHome()
      console.log(response);
    }
    let error_function = function (error) {
      // display error
      console.log(error);
    }

    // send to backend api
    trigger_new(this.state.name, this.state.date, this.state.lat, this.state.long, update_function, error_function)

    // spin will waiting
    
    event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value
    });
  }

  handleTimeChange(date) {
    console.log(date)
   this.setState({ date })
  }

  handleLocationChange(event) {
    let location = event.target.value
    if (location === "custom") 
    {
      this.setState({
        custom: true
      })
    }
    else
    {
      this.setState({
        custom: false,
        lat: LOCATIONS[location][0],
        long: LOCATIONS[location][1],
      });
    }
  }

  render() {
    return (
      <div>
        <h1>New</h1>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={this.state.name} id="name" onChange={this.handleInputChange}/>
          </div>

          <div>
            <label htmlFor="time">End time</label>
            <DateTimePicker type="text" name="time" value={this.state.date} id="date" onChange={this.handleTimeChange}/>
          </div>

          <div>
            <label htmlFor="location">Location</label>
            <select name="location" onChange={this.handleLocationChange}>
              <option value="uk">UK office</option>
              <option value="hague">Hague office</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label htmlFor="name">Latitude</label>
            <input disabled={!this.state.custom} type="text" name="lat" value={this.state.lat} id="lat" onChange={this.handleInputChange}/>
          </div>

          <div>
            <label htmlFor="name">Longitude</label>
            <input disabled={!this.state.custom} type="text" name="long" value={this.state.long} id="long" onChange={this.handleInputChange}/>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}



const mapStateToProps = ({}) => ({})


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      returnHome: () => push('/')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( New );
