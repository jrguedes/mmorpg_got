function UsuarioModel(connection) {
    this._connection = connection();
}

UsuarioModel.prototype.inserirUsuario = function (usuario) {
    this._connection.open(function (err, mongoClient) {
        mongoClient.collection('usuarios', function (err, collection) {
            collection.insert(usuario);
            mongoClient.close();
        });
    });
    console.log(usuario);
}

UsuarioModel.prototype.autenticar = function (usuario, req, res) {
    this._connection.open(function (err, mongoClient) {
        mongoClient.collection('usuarios', function (err, collection) {
            //collection.find(usuario);
            collection.find({ usuario: usuario.usuario, senha: usuario.senha }).toArray(
                function (err, result) {
                    if (result[0] != undefined) {
                        req.session.autorizado = true;
                        req.session.usuario = result[0].usuario;
                        req.session.casa = result[0].casa;
                    } else {
                        req.session.autorizado = false;
                        req.session.usuario = '';
                        req.session.casa = '';
                    }

                    if (req.session.autorizado) {
                        res.redirect('jogo');
                    } else {
                        res.render('index', { validacaoErros: [{ msg: 'Usuário ou senha inválidos' }] });
                    }
                }
            );
            mongoClient.close();
        });
    });
}

module.exports = function () {
    return UsuarioModel;
}