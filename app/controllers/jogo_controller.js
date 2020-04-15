module.exports.renderJogo = function (application, req, res) {
    if (req.session.autorizado !== true) {
        res.send('Usuário não autenticado!');
        return;
    }
    
    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var connection = application.config.db_connection;
    var jogoModel = new application.app.models.JogoModel(connection);

    jogoModel.iniciarJogo(res,usuario, casa);
}

module.exports.sair = function (application, req, res) {
    req.session.destroy(function (err) {
        res.render('index', { validacaoErros: [] });
    });
}

module.exports.renderSuditos = function (application, req, res) {
    res.render('aldeoes', {validacao:{}});
}

module.exports.renderPergaminhos = function (application, req, res) {
    res.render('pergaminhos', {validacao:{}});
}