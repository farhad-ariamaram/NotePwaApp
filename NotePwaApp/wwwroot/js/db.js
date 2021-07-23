
var db = (function () {

    var DB_NAME = 'NoteDB';
    var TABLE_NAME = 'Note';

    //+Context
    var dbPromise = idb.open(DB_NAME, 1, function (db) {
        if (!db.objectStoreNames.contains(TABLE_NAME)) {
            db.createObjectStore(TABLE_NAME, {
                keyPath: 'id'
            });
        }
    });

    //+GetById
    var getById = function (id) {
        return dbPromise.then(function (db) {
            return db
                .transaction(TABLE_NAME, 'readwrite')
                .objectStore(TABLE_NAME)
                .get(id);
        });
    }

    //+Create
    var Create = function (data) {
        return dbPromise.then(function (db) {
            var tx = db
                .transaction(TABLE_NAME, 'readwrite')
                .objectStore(TABLE_NAME)
                .put(data);
            return tx.complete;
        });
    }

    //+GetAll
    var getAll = function () {
        return dbPromise.then(function (db) {
            return db
                .transaction(TABLE_NAME, 'readonly')
                .objectStore(TABLE_NAME)
                .getAll();
        });
    }

    //+DeleteById
    var deleteById = function (id) {
        return dbPromise.then(function (db) {
            var tx = db
                .transaction(TABLE_NAME, 'readwrite')
                .objectStore(TABLE_NAME)
                .delete(id);
            return tx.complete;
        });
    }

    return {
        getById: getById,
        Create: Create,
        getAll: getAll,
        deleteById: deleteById
    };
})();