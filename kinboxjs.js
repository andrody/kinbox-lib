function kinbox() {
    const listeners = []
    let savedCb = null
    function on(name, handler) {
        listeners.push({ name, handler })
    }

    function dispatchEvent(event, data) {
        const listener = listeners.find((x) => x.name === event)
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

    function loading(isLoading) {
        dispatchMessage({ event: "loading", data: isLoading })
    }

    function setProperty(property) {
        dispatchMessage({ event: "set-property", data: property })
    }

    function addTag(tagId) {
        dispatchMessage({ event: "add-tag", data: tagId })
    }

    function removeTag(tagId) {
        dispatchMessage({ event: "remove-tag", data: tagId })
    }

    function assignTo(operatorId) {
        dispatchMessage({ event: "assign", data: operatorId })
    }

    function moveToGroup(groupId) {
        dispatchMessage({ event: "move", data: groupId })
    }

    function sendForm(form, cb) {
        savedCb = cb
        dispatchMessage({ event: "form", data: form })
    }

    function getWorkspaceInfo(cb) {
        savedCb = cb
        dispatchMessage({ event: "get-workspace-info" })
    }

    function onCallback(data) {
        if (typeof savedCb === "function") {
            savedCb(data)
            savedCb = null
        }
    }

    return {
        on,
        dialog,
        toast,
        dispatchEvent,
        setProperty,
        loading,
        addTag,
        removeTag,
        assignTo,
        moveToGroup,
        onCallback,
        sendForm,
        getWorkspaceInfo,
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
        case "callback":
            window.Kinbox.dispatchEvent(payload.event, payload.data)
            break
        case "dialog_confirm":
            window.Kinbox.onCallback(payload.data.confirmed)
        case "form_callback":
        case "get_workspace_info_callback":
            window.Kinbox.onCallback(payload.data)
    }
}
