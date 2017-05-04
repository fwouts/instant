addEventListener('message', function (e) {
    var f = new Function('', e.data)
    postMessage(f())
})
