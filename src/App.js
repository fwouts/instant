import React from 'react'
import CodeEditor from './CodeEditor'
import ResultPanel from './ResultPanel'
import './App.css'

class App extends React.Component {
    render () {
        return (
      <div className="App">
        <CodeEditor />
        <ResultPanel />
      </div>
        )
    }
}

export default App
