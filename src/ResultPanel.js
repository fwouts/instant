import React from 'react'
import { connect } from 'react-redux'
import './ResultPanel.css'

const mapStateToProps = (state) => {
  return {
    status: state.code.status,
    result: state.code.result,
    error: state.code.error,
  }
}

const mapDispatchToProps = () => {
  return {}
}

class ResultPanelComponent extends React.Component {
  render() {
    return <div className={this.className()}>
            <div>
                <div className="result">{this.props.result}</div>
                <div className="error">{this.props.error}</div>
            </div>
        </div>
  }

  className() {
    let names = ['resultPanel']
    switch (this.props.status) {
    case 'SUCCESS':
      names.push('success')
      break
    case 'FAILURE':
      names.push('failure')
      break
    default:
            // No other class name.
    }
    return names.join(' ')
  }
}

const ResultPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultPanelComponent)

export default ResultPanel
