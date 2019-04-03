import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { trigger_new } from '../../library/api'
import DateTimePicker from 'react-datetime-picker'

class New extends React.Component {
  constructor(props) {
    super(props);
    this.props = props
    let date = new Date();
    date.setHours(date.getHours()+2)
    this.state = {"name" : "", "date": date};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
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
    trigger_new(this.state.name, this.state.date, update_function, error_function)

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
