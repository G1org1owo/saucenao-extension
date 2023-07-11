let onMessageHandler = function(message) {
    chrome.runtime.onMessage.removeListener(onMessageHandler);

    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", message.url);
    form.setAttribute("enctype", "multipart/form-data");
    for(let key in message.data){
        let field = document.createElement("input");
        field.setAttribute("type", "hidden");
        field.setAttribute("name", key);
        field.setAttribute("value", message.data[key]);
        form.appendChild(field);
    }

    document.body.appendChild(form);
    form.submit();
}

chrome.runtime.onMessage.addListener(onMessageHandler)