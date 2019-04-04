import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { get_vote_list } from '../../library/api'
import { store_session_id_in_cookie, get_session_id } from '../../library/session'

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.props = props
    this.state = {vote_list : [], name: "", logged_in : true, user_id : ""};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentWillMount() {
    this.updateState() 
  }

  async updateState() {

    let session_id = get_session_id()
    if(session_id)
    {
      var data = await get_vote_list()
      console.log(data.data)
      this.setState({vote_list : data.data, logged_in: true, user_id: session_id});
    }
    else
    {
      this.setState({logged_in: false});
    }
  }

  handleSubmit(event) {

    // send to backend api
    store_session_id_in_cookie(this.state.name)
    this.updateState()
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

    if(this.state.logged_in)
    {
      const listItems = this.state.vote_list.map((vote) =>
        <div class="pure-menu-item pure-menu-link" key={vote._id}><a onClick={() => this.props.changePage('vote?'+vote._id)}>{vote.name}</a></div>
      )

      return (
        <div>
          <div class="button-bar">
            <div class="button-bar-panel">
              <button class="pure-button" onClick={() => this.props.changePage('new')}>
                Create new vote
              </button>
            </div>
            <div class="button-bar-panel">
              <button class="pure-button" onClick={() => this.props.changePage('location')}>
                Create new location
              </button>
            </div>
            <div class="button-bar-panel">
              <button class="pure-button" onClick={() => this.props.changePage('favourite')}>
                Add favourite place
              </button>
            </div>
          </div>
          <div class="standard-container"> 
            <div class="pure-menu-list">{listItems}</div>
          </div>
        </div>
      )
    }
    else
    {
      return (
        <div>
        <h1>Log in</h1>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Pick a name</label>
            <input type="text" name="name" value={this.state.name} id="name" onChange={this.handleInputChange}/>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
      )
    }
  }
}

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: (location) => push('/' + location)
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)