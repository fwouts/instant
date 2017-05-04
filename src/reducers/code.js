import store from '../store'

const code = (state = {
    result: null
}, action) => {
    switch (action.type) {
    case 'RUN':
        workerEval(action.payload.code).then(result => {
            store.dispatch({
                type: 'RUN_SUCCESSFUL',
                payload: {
                    result: result
                }
            })
        }, () => {
            store.dispatch({
                type: 'RUN_FAILED',
                payload: {}
            })
        })
        return state
    case 'RUN_SUCCESSFUL':
        return Object.assign({}, state, {
            status: 'SUCCESS',
            result: action.payload.result
        })
    case 'RUN_FAILED':
        return Object.assign({}, state, {
            status: 'FAILURE'
        })
    default:
        return state
    }
}

function workerEval(untrustedCode) {
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

export default code
