import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props
  }

  render() {
    return (
      <div class="footer">
        <p>
          <button class="pure-button" onClick={() => this.props.returnHome()}>
            Go back
          </button>
        </p>
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
)( Footer );
