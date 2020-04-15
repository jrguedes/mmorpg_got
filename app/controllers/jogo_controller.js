module.exports.renderJogo = function (application, req, res) {
    if (req.session.autorizado !== true) {
        res.send('Usuário não autenticado!');
        return;
    }

    var msg = '';
    if (req.query.msg != '') {
        msg = req.query.msg;
    }

    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var connection = application.config.db_connection;
    var jogoModel = new application.app.models.JogoModel(connection);

    jogoModel.iniciarJogo(res, usuario, casa, msg);
}

module.exports.sair = function (application, req, res) {
    req.session.destroy(function (err) {
        res.render('index', { validacaoErros: [] });
    });
}

module.exports.renderSuditos = function (application, req, res) {
    res.render('aldeoes', { validacao: {} });
}

module.exports.renderPergaminhos = function (application, req, res) {
    if (req.session.autorizado !== true) {
        res.send('Usuário não autenticado!');
        return;
    }

    res.render('pergaminhos', { validacao: {} });
}

module.exports.renderOrdenarAcaoSudito = function (application, errors, req, res) {
    if (req.session.autorizado !== true) {
        res.send('Usuário não autenticado!');
        return;
    }

    var dadosForm = req.body;

    if (!errors.isEmpty()) {
        res.redirect('jogo?msg=E');
        return;
    }

    var connection = application.config.db_connection;
    var jogoModel = new application.app.models.JogoModel(connection);

    dadosForm.usuario = req.session.usuario;
    jogoModel.acao(dadosForm);

    res.redirect('jogo?msg=S');
}