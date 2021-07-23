if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker
            .register("/sw.js", {
                scope: "/"
            })
            .then(function (res) {
                
            })
            .catch(function (error) {
                console.log(error);
            })
    });
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function setId(value) {
    localStorage.setItem("id", value);
}

function getId() {
    return localStorage.getItem("id");
}

function setFt() {
    localStorage.setItem("ft", "false");
}

function getFt() {
    return localStorage.getItem("ft");
}