import React from 'react'
import { connect } from 'react-redux'
import { runCode } from './actions'
import * as ace from 'brace'
import 'brace/mode/java'
import 'brace/theme/monokai'
import './CodeEditor.css'

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCodeChange: (code) => {
      dispatch(runCode(code))
    }
  }
}

class CodeEditorComponent extends React.Component {
  render() {
    // TODO: Don't hardcode the ID.
    return <div id="hardcodedEditorId" dangerouslySetInnerHTML={{__html: 'let value = "Hello, World!";\n\nreturn value;'}}></div>
  }

  componentDidMount() {
    this.editor = ace.edit('hardcodedEditorId')
    this.editor.setTheme('ace/theme/monokai')
    this.editor.getSession().setMode('ace/mode/javascript')
    this.editor.setOptions({
      fontSize: '14pt',
      printMargin: false,
      printMarginColumn: false,
      tabSize: 2
    })
    this.editor.addEventListener('change', () => {
      this.props.onCodeChange(this.editor.getSession().getValue())
    })
    this.props.onCodeChange(this.editor.getSession().getValue())
  }
}

const CodeEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeEditorComponent)

export default CodeEditor
