function kinbox() {
    const listeners = []
    let savedCb = null
    function on(name, handler) {
        listeners.push({ name, handler })
    }

    function dispatchEvent(event, data) {
        const listener = listeners.find(x => x.name === event)
        if (listener && typeof listener.handler === "function") {
            listener.handler(data)
        }
    }

    function dispatchMessage(event) {
        // window.parent.postMessage(event, "https://www.kinbox.com.br")
        window.parent.postMessage(event, "*")
    }

    function dialog(type, data, cb) {
        savedCb = cb
        dispatchMessage({ event: "dialog", data: { ...data, type } })
    }

    function toast(type, message) {
        dispatchMessage({ event: "toast", data: { message, type } })
    }

    function callConfirmCallback({ confirmed }) {
        if (typeof savedCb === "function") {
            savedCb(confirmed)
            savedCb = null
        }
    }

    return {
        on,
        dialog,
        toast,
        dispatchEvent,
        callConfirmCallback
    }
}

window.Kinbox = new kinbox()

window.addEventListener("message", handleMessage, false)
function handleMessage(event) {
    const payload = event.data
    // if (event.origin != "h ttp://child.com") {
    //     return
    // }
    switch (payload.event) {
        case "conversation":
        case "no_conversation":
            window.Kinbox.dispatchEvent(payload.event, payload.data)
            break
        case "dialog_confirm":
            window.Kinbox.callConfirmCallback(payload.data)
    }
}
