module.exports = function (application) {
    const { check, validationResult } = require('express-validator');

    application.get('/cadastro', function (req, res) {
        application.app.controllers.cadastro_controller.renderCadastro(application, req, res);
    });

    application.post('/cadastrar', validarFormulario('cadastrar'), function (req, res) {
        application.app.controllers.cadastro_controller.cadastrar(application, validationResult(req), req, res);
    });

    function validarFormulario(route) {
        switch (route) {
            case 'cadastrar':                
                return [
                    check('usuario').not().isEmpty().withMessage('O usuário é obrigatório'),
                    check('usuario').isLength({ min: 3, max: 15 }).withMessage('O usuário deve ter entre 3 e 15 caracteres'),
                    check('nome').not().isEmpty().withMessage('O nome é obrigatório'),
                    check('senha').not().isEmpty().withMessage('A senha é obrigatória'),
                    check('casa').not().isEmpty().withMessage('Escolha uma casa')
                ]
            default:
                return [];
        }
    }
}