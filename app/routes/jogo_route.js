module.exports = function (application) {
    application.get('/jogo', function (req, res) {
        application.app.controllers.jogo_controller.renderJogo(application, req, res);
    });

    application.get('/sair', function (req, res) {
        application.app.controllers.jogo_controller.sair(application, req, res);
    });

    application.get('/suditos', function (req, res) {
        application.app.controllers.jogo_controller.renderSuditos(application, req, res);
    });

    application.get('/pergaminhos', function (req, res) {
        application.app.controllers.jogo_controller.renderPergaminhos(application, req, res);
    });

    
}