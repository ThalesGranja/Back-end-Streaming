const { connect } = require("./db");
const Logger = require("./logger");

class Usuario {
    constructor(idUser, nameUser, email, pass, type, stats) {
        this.idUser = Number(idUser); // Garante que será um número
        this.nameUser = nameUser;
        this.email = email;
        this.pass = pass;
        this.type = type;
        this.stats = stats;
    }

    async inserir() {
        try {
            // Validação dos campos
            if (
                isNaN(this.idUser) || this.idUser === null ||
                !this.nameUser || this.nameUser.trim() === "" ||
                !this.email || this.email.trim() === "" ||
                !this.pass || this.pass.trim() === "" ||
                !this.type || this.type.trim() === "" ||
                !this.stats || this.stats.trim() === ""
            ) {
                throw new Error("Todos os campos devem ser preenchidos e o ID deve ser um número válido.");
            }

            const { db, client } = await connect();
            const result = await db.collection("usuarios").insertOne({
                idUser: this.idUser,
                nameUser: this.nameUser,
                email: this.email,
                pass: this.pass,
                type: this.type,
                stats: this.stats,
            });
            console.log("Usuario inserido:", result.insertedId);
            client.close();
        } catch (error) {
            console.log("Erro ao inserir usuário:", error.message);
        }
    }

    static async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("usuarios").updateMany(filtro, { $set: novosDados });
            console.log("Usuarios atualizados: ", result.modifiedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao atualizar usuarios! " + error);
        }
    }

    static async buscar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const usuarios = await db.collection("usuarios").find(filtro).toArray();
            console.log("Usuarios encontrados!", usuarios);
            client.close();
        } catch (error) {
            Logger.log("Erro ao buscar usuarios! " + error);
        }
    }

    static async deletar(filtro) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("usuarios").deleteMany(filtro);
            console.log("Usuario deletado com sucesso!", result.deletedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao deletar usuarios " + error);
        }
    }
}

module.exports = Usuario;
