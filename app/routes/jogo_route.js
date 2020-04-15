module.exports = function (application) {
    const { check, validationResult } = require('express-validator');

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

    application.post('/ordernar_acao_sudito', validarFormJogo('jogo'), function (req, res) {
        application.app.controllers.jogo_controller.renderOrdenarAcaoSudito(application, validationResult(req), req, res);
    });

    function validarFormJogo(route) {
        switch (route) {
            case 'jogo':
                return [
                    check('acao').not().isEmpty().withMessage('A ação deve ser escolhida'),
                    check('quantidade').not().isEmpty().withMessage('A quantidade deve ser preenchida')
                ];
            default:
                return [];
        }
    }



}