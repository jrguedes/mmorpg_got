module.exports.renderJogo = function(application, req, res){
    application.app.controllers.jogo_controller.renderJogo(application, req, res);
}