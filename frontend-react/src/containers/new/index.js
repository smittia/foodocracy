import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { trigger_new, get_locations } from '../../library/api'
import DateTimePicker from 'react-datetime-picker'
import Footer from '../app/footer'

class New extends React.Component {
  constructor(props) {
    super(props);
    this.props = props
    let date = new Date();
    date.setHours(date.getHours()+2)
    this.state = {name : "", date: date, lat : "", long : "", custom : true, location_name: 'custom', location_list : []};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }

  async componentWillMount() {
    var data = await get_locations(this.state.id)

    this.setState({location_list : data.data});

    if(data.data.length !== 0)
    {
      this.updateLocation(data.data[0].name)
    }
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
    trigger_new(this.state.name, this.state.date, this.state.location_name, this.state.lat, this.state.long, update_function, error_function)

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

  updateLocation(location_name) {
     if (location_name === "custom") 
    {
      this.setState({
        custom: true,
        location_name: location_name,
      })
    }
    else
    {
      var location = this.state.location_list.filter((location) => location.name === location_name)
      if(location.length !== 0)
      {
        this.setState({
          location_name: location_name,
          custom: false,
          lat: location[0].lat,
          long: location[0].long,
        });
      }
    }
  }

  handleLocationChange(event) {
    let location = event.target.value
    this.updateLocation(location)
  }

  render() {

    const location_options = this.state.location_list.map((location) =>
      <option key={location._id} value={location.name}>{location.name}</option>
    )

    return (
      <div>
        <h1 class="standard_title">New</h1>

        <form class="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Enter details for a new vote</legend>
            <div class="pure-control-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" value={this.state.name} id="name" onChange={this.handleInputChange}/>
            </div>

            <div class="pure-control-group">
              <label htmlFor="time">End time</label>
              <DateTimePicker type="text" name="time" value={this.state.date} id="date" onChange={this.handleTimeChange}/>
            </div>

            <div class="pure-control-group">
              <label htmlFor="location">Location</label>
              <select name="location" onChange={this.handleLocationChange} value={this.state.location_name}>
                {location_options}
                <option value="custom">Custom</option>
              </select>
            </div>

            <div class="pure-control-group">
              <label htmlFor="name">Latitude</label>
              <input disabled={!this.state.custom} type="text" name="lat" value={this.state.lat} id="lat" onChange={this.handleInputChange}/>
            </div>

            <div class="pure-control-group">
              <label htmlFor="name">Longitude</label>
              <input disabled={!this.state.custom} type="text" name="long" value={this.state.long} id="long" onChange={this.handleInputChange}/>
            </div>

          </fieldset>
          <input class="pure-button pure-button-primary" type="submit" value="Submit" />
        </form>

        <Footer />
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
