var SERVER_URL = '/api/notes/';

function check()
{
    return fetch(SERVER_URL + "check");
}

function deleteall() {
    return fetch(SERVER_URL + "deleteall");
}

function isdeletefalse(noteData) {
    return fetch(SERVER_URL + "isdeletefalse", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(noteData)
    });
}

function getallisdelfalse() {
    return fetch(SERVER_URL + "getallisdelfalse");
}

async function getall() {
    return fetch(SERVER_URL + "getall");
}

