module.exports.renderHome = function(application, req, res){
    res.render('index', {validacaoErros: []});
}

module.exports.autenticar = function(application, errors ,req, res){
    var dadosForm = req.body;

    if (!errors.isEmpty()){
        res.render('index', {validacaoErros: errors.array()});
        return;
    }

    var connection = application.config.db_connection;
    var usuarioModel = new application.app.models.UsuarioModel(connection);
    usuarioModel.autenticar(dadosForm, req, res);

    //res.send('Tudo Ok');
}