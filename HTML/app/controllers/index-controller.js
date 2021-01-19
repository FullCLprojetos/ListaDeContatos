angular.module('main').controller('indexController', ['$rootScope', 'messageService', '$scope', function($rootScope, messageService, $scope) {
    $rootScope.transition = false;
    $rootScope.titulo = "Lista de Contatos";
    $rootScope.messageBox = "";
    $rootScope.Pesquisa = true;
    $rootScope.search = {};
    $scope.LinkGit = function() {
        window.open('https://github.com/FullCLprojetos/ListaDeContatos');
    }

}])