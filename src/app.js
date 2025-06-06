const readline = require("readline");
const Usuario = require("./controllers/usuariosController.js");
const Filme = require("./controllers/filmesController.js");
const Comentario = require("./controllers/comentariosController.js");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function pergunta(msg) {
    return new Promise((resolve) => {
        rl.question(msg, resolve);
    });
}

async function menuUsuario() {
    console.log("\x1b[32m\n--- Menu de Usuários ---\x1b[0m");
    console.log("1. Inserir");
    console.log("2. Buscar");
    console.log("3. Atualizar");
    console.log("4. Deletar");
    console.log("9. Limpar terminal");
    console.log("0. Voltar");

    const opcao = await pergunta("Escolha uma opção: ");

    switch (opcao) {
        case "1":
            const idUser = Number(await pergunta("ID do usuário: "));
            const nameUser = await pergunta("Nome: ");
            const email = await pergunta("Email: ");
            const pass = await pergunta("Senha: ");
            const type = await pergunta("Tipo: ");
            const stats = await pergunta("Status: ");
            const novoUsuario = new Usuario(idUser, nameUser, email, pass, type, stats);
            await novoUsuario.inserir();
            break;

        case "2":
            const usuarios = await Usuario.buscar();
            console.log(usuarios);
            break;

        case "3":
            const campoFiltro = await pergunta("Campo para buscar (ex: idUser): ");
            let valorFiltro = await pergunta("Valor do campo: ");
            if (campoFiltro === "idUser") valorFiltro = Number(valorFiltro);

            const campoAtualizar = await pergunta("Campo para atualizar (ex: email): ");
            let novoValor = await pergunta("Novo valor: ");
            if (campoAtualizar === "idUser") novoValor = Number(novoValor);

            await Usuario.atualizar({ [campoFiltro]: valorFiltro }, { [campoAtualizar]: novoValor });
            break;

        case "4":
            const campoDel = await pergunta("Campo para deletar (ex: idUser): ");
            let valorDel = await pergunta("Valor do campo: ");
            if (campoDel === "idUser") valorDel = Number(valorDel);

            await Usuario.deletar({ [campoDel]: valorDel });
            break;

        case "9":
            console.clear();
            break;

        case "0":
            return;

        default:
            console.log("Opção inválida.");
    }

    await menuUsuario();
}

async function menuFilme() {
    console.log("\x1b[32m\n--- Menu de Filmes ---\x1b[0m");
    console.log("1. Inserir");
    console.log("2. Buscar");
    console.log("3. Atualizar");
    console.log("4. Deletar");
    console.log("9. Limpar terminal");
    console.log("0. Voltar");

    const opcao = await pergunta("Escolha uma opção: ");

    switch (opcao) {
        case "1":
            const idFilm = Number(await pergunta("ID do filme: "));
            const nameFilm = await pergunta("Nome: ");
            const leng = await pergunta("Duração: ");
            const gen = await pergunta("Gênero: ");
            const classif = await pergunta("Classificação: ");
            const desc = await pergunta("Descrição: ");
            const novoFilme = new Filme(idFilm, nameFilm, leng, gen, classif, desc);
            await novoFilme.inserir();
            break;

        case "2":
            const filmes = await Filme.buscar();
            console.log(filmes);
            break;

        case "3":
            const filtroCampo = await pergunta("Campo para buscar (ex: idFilm): ");
            let filtroValor = await pergunta("Valor do campo: ");
            if (filtroCampo === "idFilm") filtroValor = Number(filtroValor);

            const atualizaCampo = await pergunta("Campo para atualizar (ex: nameFilm): ");
            let valorNovo = await pergunta("Novo valor: ");
            if (atualizaCampo === "idFilm") valorNovo = Number(valorNovo);

            await Filme.atualizar({ [filtroCampo]: filtroValor }, { [atualizaCampo]: valorNovo });
            break;

        case "4":
            const deletarCampo = await pergunta("Campo para deletar (ex: idFilm): ");
            let deletarValor = await pergunta("Valor do campo: ");
            if (deletarCampo === "idFilm") deletarValor = Number(deletarValor);

            await Filme.deletar({ [deletarCampo]: deletarValor });
            break;

        case "9":
            console.clear();
            break;

        case "0":
            return;

        default:
            console.log("Opção inválida.");
    }

    await menuFilme();
}

async function menuComentario() {
    console.log("\x1b[32m\n--- Menu de Comentários ---\x1b[0m");
    console.log("1. Inserir");
    console.log("2. Buscar");
    console.log("3. Atualizar");
    console.log("4. Deletar");
    console.log("9. Limpar terminal");
    console.log("0. Voltar");

    const opcao = await pergunta("Escolha uma opção: ");

    switch (opcao) {
        case "1":
            const idCom = Number(await pergunta("ID do comentário: "));
            const idUser = Number(await pergunta("ID do usuário: "));
            const idFilm = Number(await pergunta("ID do filme: "));
            const content = await pergunta("Conteúdo: ");
            const date = await pergunta("Data: ");
            const novoComentario = new Comentario(idCom, idUser, idFilm, content, date);
            await novoComentario.inserir();
            break;

        case "2":
            const comentarios = await Comentario.buscar();
            console.log(comentarios);
            break;

        case "3":
            const campoFiltro = await pergunta("Campo para buscar (ex: idCom): ");
            let valorFiltro = await pergunta("Valor do campo: ");
            if (["idCom", "idUser", "idFilm"].includes(campoFiltro)) valorFiltro = Number(valorFiltro);

            const campoAtualiza = await pergunta("Campo para atualizar (ex: content): ");
            let novoValor = await pergunta("Novo valor: ");
            if (["idCom", "idUser", "idFilm"].includes(campoAtualiza)) novoValor = Number(novoValor);

            await Comentario.atualizar({ [campoFiltro]: valorFiltro }, { [campoAtualiza]: novoValor });
            break;

        case "4":
            const campoDel = await pergunta("Campo para deletar (ex: idCom): ");
            let valorDel = await pergunta("Valor do campo: ");
            if (["idCom", "idUser", "idFilm"].includes(campoDel)) valorDel = Number(valorDel);

            await Comentario.deletar({ [campoDel]: valorDel });
            break;

        case "9":
            console.clear();
            break;

        case "0":
            return;

        default:
            console.log("Opção inválida.");
    }

    await menuComentario();
}

async function menuPrincipal() {
    let opcao = "";
    while (opcao !== "0") {
        console.log("\x1b[34m=== Menu Principal ===\x1b[0m");
        console.log("1. Usuários");
        console.log("2. Filmes");
        console.log("3. Comentários");
        console.log("9. Limpar terminal");
        console.log("0. Sair");

        opcao = await pergunta("Escolha uma opção: ");

        switch (opcao) {
            case "1":
                await menuUsuario();
                break;
            case "2":
                await menuFilme();
                break;
            case "3":
                await menuComentario();
                break;
            case "9":
                console.clear();
                break;
            case "0":
                console.log("Saindo...");
                break;
            default:
                console.log("Opção inválida.");
        }
    }

    rl.close();
}

menuPrincipal();
