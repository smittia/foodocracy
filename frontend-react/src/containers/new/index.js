import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { trigger_new } from '../../library/api'

class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = {"name" : "", "time": ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
    trigger_new(this.state.name, this.state.time)

    // send to backend api

    // handle good and bad functions 

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
        <h1>New</h1>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={this.state.name} id="name" onChange={this.handleInputChange}/>
          </div>

          <div>
            <label htmlFor="time">End time</label>
            <input type="text" name="time" value={this.state.time} id="time" onChange={this.handleInputChange}/>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}


/*
const New = props => (
  
)

const mapStateToProps = ({}) => ({})


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push('/about-us')
    },
    dispatch
  )

*/

export default New;
