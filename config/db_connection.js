var mongo = require('mongodb');

var MongoDBConnection = function(){
    console.log('Entrou na funcao de conexao');
    var db = new mongo.Db(
        'db_got',
        new mongo.Server(
            'localhost',
            27017,
            {}
        ),
        {}
    );
    return db;
}

module.exports = function () {
    return MongoDBConnection;
}