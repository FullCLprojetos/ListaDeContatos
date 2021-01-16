angular.module("main",["ngAnimate","ngRoute"]).config(["$routeProvider","$locationProvider",function(e,o){o.html5Mode(!0),e.when("/",{templateUrl:"partials/principal.html",controller:"principalController"}),e.when("/cadastro",{templateUrl:"partials/cadastro.html",controller:"cadastroController"}),e.otherwise({redirectTo:"/"})}]),angular.module("main").service("cadastroService",["$http","messageService",function(e,o){this.cadastro=function(t){e.post("http://localhost:8080/api/contatos/",t).success((e=>{o.insereMensagem("Cadastro feito com sucesso")})).error((e=>{o.insereMensagem(`Cadastro falhou: ${e.conteudoResposta.mensagem}`)}))}}]),angular.module("main").service("deletaService",["$http","messageService",function(e,o){this.deleta=function(t){e.delete(`http://localhost:8080/api/contatos/${t}`).success((e=>{o.insereMensagem("Deletado com sucesso")})).error((e=>{o.insereMensagem("Ocorreu um erro ao deletar")}))}}]),angular.module("main").service("listagemService",["$http","$rootScope","messageService",function(e,o,t){this.listagem=function(){e.get("http://localhost:8080/api/contatos",{method:"GET"}).success((e=>{o.resp=e,o.contatos=o.resp.conteudoResposta,o.contatos&&t.insereMensagem("Não existe nenhum contato")})).error((e=>{t.insereMensagem("Ocorreu um erro na busca")}))}}]),angular.module("main").service("messageService",["$rootScope","$timeout",function(e,o){this.insereMensagem=function(t){e.transition=!0,e.messageBox=`${t}`,o((o=>{e.transition=!1,e.messageBox=""}),5e3)}}]),angular.module("main").controller("cadastroController",["$scope","$rootScope","$location","cadastroService",function(e,o,t,a){o.titulo="Adição de contatos",e.nome="",e.email="",e.num="",o.Pesquisa=!1,e.cadastrar=function(){e.data={nome:e.nome,email:e.email,numero:e.num},a.cadastro(e.data)},e.inicio=function(){t.path("/")}}]),angular.module("main").controller("indexController",["$rootScope",function(e){e.transition=!1,e.titulo="Lista de Contatos",e.messageBox="",e.Pesquisa=!0}]),angular.module("main").controller("principalController",["$rootScope","$scope","listagemService","deletaService",function(e,o,t,a){e.titulo="Lista de Contatos",t.listagem(),e.Pesquisa=!0,o.excluir=function(e){a.deleta(e)}}]);