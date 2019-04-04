import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { trigger_favourite_add, get_locations } from '../../library/api'
import Footer from '../app/footer'


class Favourite extends React.Component {
  constructor(props) {
    super(props);
    this.props = props
    this.state = {name : "", location : "", distance : "", location_list:[]};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);

  }

  async componentWillMount() {
    var data = await get_locations(this.state.id)

    this.setState({location_list : data.data});

    if(data.data.length !== 0)
    {
      this.updateLocation(data.data[0].name)
    }
  }

  updateLocation(location_name) {
    var location = this.state.location_list.filter((location) => location.name === location_name)
    if(location.length !== 0)
    {
      this.setState({
        location: location_name,
      });
    }
  }

  handleLocationChange(event) {
    let location = event.target.value
    this.updateLocation(location)
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
    trigger_favourite_add(this.state.name, this.state.location, this.state.distance, update_function, error_function)

    // spin will waiting
    
    event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value
    });
  }

  render() {

    const location_options = this.state.location_list.map((location) =>
      <option key={location._id} value={location.name}>{location.name}</option>
    )

    return (
      <div>
        <h1 class="standard_title">Add location</h1>

        <form class="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Enter details for a new vote</legend>
            <div class="pure-control-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" value={this.state.name} id="name" onChange={this.handleInputChange}/>
            </div>

            <div class="pure-control-group">
              <label htmlFor="location">Location</label>
              <select name="location" onChange={this.handleLocationChange} value={this.state.location_name}>
                {location_options}
              </select>
            </div>

            <div class="pure-control-group">
              <label htmlFor="name">Distance from (m)</label>
              <input type="text" name="distance" value={this.state.long} id="distance" onChange={this.handleInputChange}/>
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
)( Favourite );
