module.exports = function (application) {
	const { check, validationResult } = require('express-validator');

	application.get('/', function (req, res) {
		application.app.controllers.home_controller.renderHome(application, req, res);
	});

	application.post('/autenticar', validarLogin('login'), function (req, res) {
		application.app.controllers.home_controller.autenticar(application, validationResult(req), req, res);
	});

	function validarLogin(route){
		switch (route) {
			case 'login':
				return [
					check('usuario').not().isEmpty().withMessage('Usuário é obrigatorio'),
					check('senha').not().isEmpty().withMessage('Senha é obrigatoria')
				];
			default:
				return [];
		}
	}
}