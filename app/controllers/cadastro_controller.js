

module.exports.renderCadastro = function (appplication, req, res) {
    res.render('cadastro', { validacao: [], dadosForm: {} });
}

module.exports.cadastrar = function (application, errors, req, res) {
    var dadosForm = req.body;

    console.log(errors);
    if (!errors.isEmpty()) {
        res.render('cadastro', { validacao: errors.array(), dadosForm: dadosForm });
        return;
    }
    var connection = application.config.db_connection;
    var usuarioModel = new application.app.models.UsuarioModel(connection);
    usuarioModel.inserirUsuario(dadosForm);

    console.log('TUDO OK!');
    res.send('Podemos cadastrar, tudo ok!');


}

