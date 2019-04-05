import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { trigger_location_add } from '../../library/api'
import Footer from '../app/footer'

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.props = props
    this.state = {"name" : "", "lat" : "", "long" : ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {

    let props = this.props
    let update_function = function (response) {
      console.log("successfully updated location");

      // redirect to main page
      props.returnHome()
      console.log(response);
    }
    let error_function = function (error) {
      // display error
      console.log(error);
    }

    // send to backend api
    trigger_location_add(this.state.name, this.state.lat, this.state.long, update_function, error_function)

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

    return (
      <div>
        <h1 class="standard_title">Add location</h1>

        <form class="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Locations give the starting point for new votes</legend>
            <div class="pure-control-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" value={this.state.name} id="name" onChange={this.handleInputChange}/>
            </div>

            <div class="pure-control-group">
              <label htmlFor="name">Latitude</label>
              <input type="text" name="lat" value={this.state.lat} id="lat" onChange={this.handleInputChange}/>
            </div>

            <div class="pure-control-group">
              <label htmlFor="name">Longitude</label>
              <input type="text" name="long" value={this.state.long} id="long" onChange={this.handleInputChange}/>
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
)( Location );
