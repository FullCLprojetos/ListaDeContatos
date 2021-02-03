import {listarContatos} from "./fetcher.js";
import {excluir} from "./remove.js";

const  tbody = document.querySelector("#lista_contatos");
const mensagem_erro = document.querySelector('#erro');
let naoTemNada = document.querySelector("#naoTemNada");
let campoPesquisa = document.querySelector("#pesquisa");

export {conteudo,createElement,createText,addId,addNoElement,addClasse, removeClasse,tbody}
function conteudo(pagina){
    listarContatos(pagina).then(conteudo => {

        existeConteudo(conteudo);
        conteudo.conteudoResposta.forEach(i => {

            let tr = createElement('tr')
            addId(tr, `id_contato_${i.id}`);
            addClasse(tr, ['contatos']);

            let td = createElement('td');
            addClasse(td,['nomeContatos']);
            let td2 = createElement('td');
            addClasse(td2, ['emailContatos'])
            let td3 = createElement('td');
            addClasse(td3,['numeroContatos'])
            let td4 = createElement('td');
            addClasse(td4, 'qrContatos')

            let buttonExcluir = createElement('button');
            addId(buttonExcluir, "botaoExcluir");
            addClasse(buttonExcluir, ['btn', 'btn-danger']);

            let buttonEditar = createElement('button');
            addId(buttonEditar, "botaoEditar");
            addClasse(buttonEditar, ['btn', 'btn-primary']);

            buttonExcluir.addEventListener("click", f => {
                let retornoConfirmacao = confirmacao("Deseja excluir esse contato?")

                if (retornoConfirmacao) {
                    excluir(i.id).then(suc => {
                        let removido = document.querySelector(`#id_contato_${i.id}`)

                        addClasse(removido, ['apaga']);

                        setTimeout(function () {
                            removido.remove();
                        }, 500)
                    });
                }
            });

            buttonEditar.addEventListener("click", f=>{
                let retornoConfimacao = confirmacao("Deseja editar esse contato?");

                if (retornoConfimacao)
                {
                    window.location.replace(`${i.id}`);

                }
            })

            td.appendChild(createText(i.nome));
            td2.appendChild(createText(i.email));
            td3.appendChild(createText(i.numero));
            buttonExcluir.appendChild(createText("X"));
            buttonEditar.appendChild(createText("Edit"))

            let qr = qrcode(0,"M");
            let data = {
                'nome': i.nome,
                'email': i.email,
                'numero': i.numero
            }
            let json = JSON.stringify(data);
            qr.addData(json);
            qr.make();

            td4.innerHTML = qr.createImgTag();

            addNoElement(tr, td);
            addNoElement(tr, td2);
            addNoElement(tr, td3);
            addNoElement(tr, td4);
            addNoElement(tr, buttonExcluir);
            addNoElement(tr, buttonEditar);
            addNoElement(tbody, tr)

        });

        campoPesquisa.addEventListener("input",function (){
            let contatos = document.querySelectorAll(".contatos");

            if(campoPesquisa.value.length > 0) {
                for (let i = 0; i < contatos.length; i++) {
                    let contato = contatos[i];
                    let tdNome = contato.querySelector('.nomeContatos');
                    let nome = tdNome.textContent;
                    var expressao = new RegExp(campoPesquisa.value, "i");
                    console.log(contato)

                    if (!expressao.test(nome)) {
                        addClasse(contato,['invisivel'])
                    } else {

                        removeClasse(contato,['invisivel'])
                    }

                }
            }else{
                for(let i=0; i < contatos.length;i++){
                    let contato = contatos[i];
                    contato.classList.remove("invisivel");
                }
            }

        });

    });
}

function confirmacao(texto) {
    if (confirm(texto)) {
        return true;
    }else{
        return false;
    }
}

function createElement(elemento){
    return document.createElement(elemento);
}

function createText(text){
    return document.createTextNode(text);
}

function addClasse(text,classe){
    text.classList.add(...classe);
}
function removeClasse(text,classe){
    text.classList.remove(...classe);
}
function addId(element,nomeId){
    element.id = nomeId
}
function addNoElement(element,add){
    element.appendChild(add);
}
function existeConteudo(conteudo) {
    if (!conteudo.sucesso) {
        mensagem_erro.innerHTML = `Ocorreu um erro ${conteudo.conteudoResposta.mensagem}`;
        addClasse(mensagem_erro, ['fade-in'])
        removeClasse(mensagem_erro,['invisible']);

        setTimeout(function () {
            removeClasse(mensagem_erro,['fade-in'])
            addClasse(mensagem_erro, ['fade-out'])

            setTimeout(function () {
                addClasse(mensagem_erro,['invisible']);
            }, 500);
        }, 500);
    } else {
        if (!conteudo.conteudoResposta.length) {
            naoTemNada.remove();
            mensagem_erro.innerHTML = `Não existe nenhum contato`
            mensagem_erro.classList.add('fade-in');

            removeClasse(mensagem_erro, ['invisible']);

            setTimeout(function () {
                removeClasse(mensagem_erro, ['fade-in']);
                addClasse(mensagem_erro, ['fade-out']);
                setTimeout(function () {
                    addClasse(mensagem_erro, ['invisible']);
                }, 5000);
            }, 5000);
        }
    }
}
