import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Home = props => (
  <div>
    <p>
      <button onClick={() => props.changePage()}>
        Create new vote
      </button>
    </p>
  </div>
)

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push('/new')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)