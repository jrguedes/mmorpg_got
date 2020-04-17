var crypto = require('crypto');
function UsuarioModel(connection) {
    this._connection = connection();
}

UsuarioModel.prototype.inserirUsuario = function (usuario) {
    this._connection.open(function (err, mongoClient) {
        mongoClient.collection('usuarios', function (err, collection) {

            var senha_criptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
            usuario.senha = senha_criptografada;
            collection.insert(usuario);
            mongoClient.close();
        });
    });
}

UsuarioModel.prototype.autenticar = function (usuario, req, res) {
    this._connection.open(function (err, mongoClient) {
        mongoClient.collection('usuarios', function (err, collection) {

            var senha_criptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
            //collection.find(usuario);
            collection.find({ usuario: usuario.usuario, senha: senha_criptografada }).toArray(
                function (err, result) {
                    console.log('RESULT USUARIO: ' + result);

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