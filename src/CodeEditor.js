import React from 'react'
import * as ace from 'brace'
import 'brace/mode/java'
import 'brace/theme/monokai'
import './CodeEditor.css'

class CodeEditor extends React.Component {
    render() {
    // TODO: Don't hardcode the ID.
        return <div id="hardcodedEditorId"></div>
    }

    componentDidMount() {
        this.editor = ace.edit('hardcodedEditorId')
        this.editor.setTheme('ace/theme/monokai')
        this.editor.getSession().setMode('ace/mode/javascript')
        this.editor.addEventListener('change', () => {
            this.runCode()
        })
    }

    runCode() {
        console.clear()
        this.workerEval(this.editor.getSession().getValue()).then(result => {
            console.log('Result:', result)
        }, () => {
          // Ignore errors.
        })
    }

    workerEval(untrustedCode) {
        return new Promise(function (resolve, reject) {
            var worker = new Worker('worker.js')

            worker.onmessage = function (e) {
                worker.terminate()
                resolve(e.data)
            }

            worker.onerror = function (e) {
                reject(new Error(e.message))
            }

            worker.postMessage(untrustedCode)

            setTimeout(function () {
                worker.terminate()
                reject(new Error('The worker timed out.'))
            }, 1000)
        })
    }
}

export default CodeEditor
