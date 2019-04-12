import React from 'react'
import { get_vote, trigger_vote, trigger_unvote } from '../../library/api'
import { get_session_id } from '../../library/session'
import dateFormat from 'dateformat';
import Footer from '../app/footer'

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.props = props
    let id = props.location.search.substring(1)
    this.state = {name : "", voted_places : [], unvoted_places : [], id : id, user : "", time_ending : "", expired : false};
    this.handleVote = this.handleVote.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentWillMount() {
    this.updateState() 
  }

  async updateState() {
    var data = await get_vote(this.state.id)

    let voted_places = data.data.places.filter(
      (place) => place.votes.length !== 0).sort(
      (place_1, place_2) => (parseInt(place_1.distance)-parseInt(place_2.distance))).sort(
      (place_1, place_2) => (place_2.votes.length-place_1.votes.length))

    let unvoted_places = data.data.places.filter(
      (place) => place.votes.length === 0).sort(
      (place_1, place_2) => (parseInt(place_1.distance)-parseInt(place_2.distance)))

    let user = get_session_id()

    let time = new Date(data.data.time_ending)
    let expired = time < new Date()

    this.setState({name : data.data.name, voted_places : voted_places,
      unvoted_places: unvoted_places, user : user, time_ending : dateFormat(time, "dddd, h:MM TT"), expired:expired});
  }

  handleVote(place) {
    if(!this.state.expired)
    {
      let id = place.id
      this.updateState()
      let update_function = (response) => {
        console.log("hi");
        this.updateState()
        console.log(response);
      }
      let error_function = function (error) {
        // display error
        console.log(error);
      }
      if(place.votes.includes(this.state.user))
      {
        trigger_unvote(id, this.state.id, this.state.user, update_function, error_function)
      }
      else
      {
        trigger_vote(id, this.state.id, this.state.user, update_function, error_function)
      }
    }
  }

  render() {


    const votedListItems = this.state.voted_places.map( (place) => {
        const user = this.state.user
        const ticks = place.votes.map((vote) => {
          if(vote === user){
            return (<span key={vote} title={vote} >✔</span>)
          } else {
            return (<span key={vote} title={vote} >✓</span>)
          }
        })

        return (
        <div class="pure-menu-item pure-menu-link" key={place.id}>
          <a disabled={this.state.expired} onClick={() => this.handleVote(place)}>{place.title} : {place.distance}m </a>{ticks}
        </div>
        )
      }
    )

    const unvotedListItems = this.state.unvoted_places.map((place) =>
     <div class="pure-menu-item pure-menu-link" key={place.id}> 
        <a className={place.favourite ? 'favourite' : null} disabled={this.state.expired} onClick={() => this.handleVote(place)}>{place.title} : {place.distance}m</a>
     </div>
    )

    return (
      <div>
        <h1 class="standard_title">Vote on {this.state.name} ending at {this.state.time_ending}</h1>
        <h2>Vote as {this.state.user}</h2>
        {this.state.expired && <h2>EXPIRED</h2>}

        <h3>Voted</h3>
        <div class="standard-container"> 
            <div class="pure-menu-list">{votedListItems}</div>
        </div>
        <h3>Other</h3>
        <div class="standard-container"> 
            <div class="pure-menu-list">{unvotedListItems}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Vote;
