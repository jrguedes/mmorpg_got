module.exports.renderJogo = function (application, req, res) {
    if (req.session.autorizado) {
        res.render('jogo');
    } else {
        res.send('Usuário não autenticado!');
    }
}

module.exports.sair = function (application, req, res) {    
    req.session.destroy(function (err) {
        res.render('index', { validacaoErros: [] });
    });
}