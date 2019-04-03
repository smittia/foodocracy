import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { get_vote_list } from '../../library/api'

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.props = props
    this.state = {vote_list : []};
  }

  async componentWillMount() {
    var data = await get_vote_list()
    console.log(data.data)
    this.setState({vote_list : data.data});
  }

  render() {
    const listItems = this.state.vote_list.map((vote) =>
      <div key={vote._id}><a onClick={() => this.props.changePage('vote?'+vote._id)}>{vote.name}</a></div>
    )

    return (
      <div>
        <p>
          <button onClick={() => this.props.changePage('new')}>
            Create new vote
          </button>
        </p>
        <div>{listItems}</div>
      </div>
    )
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