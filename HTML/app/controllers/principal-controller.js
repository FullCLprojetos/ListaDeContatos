angular.module('main').controller('principalController', ['$rootScope', '$scope', 'listagemService', 'deletaService', function ($rootScope, $scope, listagemService, deletaService) {
    $rootScope.titulo = "Lista de Contatos";
    $rootScope.pesquisa = true;
    listagemService.listagem();

    $scope.excluir = function (id) {
        deletaService.deleta(id);
    }
    $scope.edita = function (id) {
        window.location.replace(`/edita/${id}`)
    }
    $scope.abrirContato = function(id){
        window.location.replace(`/contato/${id}`)
    }

}])