angular.module("main",["ngAnimate","ngRoute"]).config(["$routeProvider","$locationProvider",function(e,o){o.html5Mode(!0),e.when("/",{templateUrl:"partials/principal.html",controller:"principalController"}),e.when("/cadastro",{templateUrl:"partials/cadastroForm.html",controller:"cadastroController"}),e.when("/edita/:id",{templateUrl:"partials/editaForm.html",controller:"editaController"}),e.otherwise({redirectTo:"/"})}]),angular.module("main").service("cadastroService",["$http","messageService",function(e,o){this.cadastro=function(t){e.post("http://localhost:8080/api/contatos/",t).success((e=>{o.insereMensagem("Cadastro feito com sucesso")})).error((e=>{o.insereMensagem(`Cadastro falhou: ${e.conteudoResposta.mensagem}`)}))}}]),angular.module("main").service("deletaService",["$http","messageService",function(e,o){this.deleta=function(t){e.delete(`http://localhost:8080/api/contatos/${t}`).success((e=>{o.insereMensagem("Deletado com sucesso"),angular.element(document.querySelector(`#idcontato${t}`)).remove()})).error((e=>{o.insereMensagem("Ocorreu um erro ao deletar")}))}}]),angular.module("main").service("editaService",["$http","messageService","$rootScope","listagemService",function(e,o,t,a){this.edita=function(t,a){e.put(`http://localhost:8080/api/contatos/${t}`,a).success((e=>{o.insereMensagem("Edição feita com sucesso")})).error((e=>{o.insereMensagem(`Edição falhou: ${e.conteudoResposta.mensagem}`)}))}}]),angular.module("main").service("listagemService",["$http","$rootScope","messageService",function(e,o,t){this.listagem=function(a){null==a&&(a=""),e.get(`http://localhost:8080/api/contatos/${a}`,{method:"GET"}).success((e=>{o.resp=e,o.contatos=o.resp.conteudoResposta,null!=o.contatos?(0==e.conteudoResposta.length&&t.insereMensagem("Não encontramos nenhum contato"),o.$broadcast("success",e)):t.insereMensagem("Não foi possivél efetuar a busca")})).error((e=>{t.insereMensagem("Ocorreu um erro na busca")}))}}]),angular.module("main").service("messageService",["$rootScope","$timeout",function(e,o){this.insereMensagem=function(t){e.transition=!0,e.messageBox=`${t}`,o((o=>{e.transition=!1,e.messageBox=""}),5e3)}}]),angular.module("main").directive("ngConfirmClick",[function(){return{link:function(e,o,t){var a=t.ngConfirmClick||"Tem certeza?",n=t.confirmedClick;o.on("click",(function(o){window.confirm(a)&&e.$eval(n)}))}}}]),angular.module("main").controller("cadastroController",["$scope","$rootScope","$location","cadastroService",function(e,o,t,a){o.titulo="Adição de contatos",e.nome="",e.email="",e.num="",o.Pesquisa=!1,e.cadastrar=function(){e.data={nome:e.nome,email:e.email,numero:e.num},a.cadastro(e.data)},e.inicio=function(){t.path("/")}}]),angular.module("main").controller("editaController",["$scope","$rootScope","$location","editaService","listagemService","$routeParams",function(e,o,t,a,n,i){o.titulo="Edição de contatos",e.id=i.id,e.nome="",e.email="",e.num="",n.listagem(e.id),o.$on("success",(function(t,a){e.nome=o.contatos.nome,e.email=o.contatos.email,e.num=o.contatos.numero})),o.Pesquisa=!1,e.cadastrar=function(){e.data={nome:e.nome,email:e.email,numero:e.num},a.edita(e.id,e.data)},e.inicio=function(){t.path("/")}}]),angular.module("main").controller("indexController",["$rootScope","messageService","$scope",function(e,o,t){e.transition=!1,e.titulo="Lista de Contatos",e.messageBox="",e.Pesquisa=!0,t.Search=function(){o.insereMensagem("Não adicionada função Pesquisar")},t.LinkGit=function(){window.open("https://github.com/FullCLprojetos/ListaDeContatos")}}]),angular.module("main").controller("principalController",["$rootScope","$scope","listagemService","deletaService",function(e,o,t,a){e.titulo="Lista de Contatos",e.Pesquisa=!0,t.listagem(),o.excluir=function(e){a.deleta(e)},o.edita=function(e){window.location.replace(`/edita/${e}`)}}]);
//# sourceMappingURL=all.js.map
