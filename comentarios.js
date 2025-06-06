const { connect } = require("./db");
const Logger = require("./logger");

class Comentario {
    constructor(idCom, idUser, idFilm, message, dateCom) {
        this.idCom = Number(idCom);
        this.idUser = Number(idUser);
        this.idFilm = Number(idFilm);
        this.message = message;
        this.dateCom = dateCom;
    }

    async inserir() {
        try {
            // Validação dos campos
            if (
                isNaN(this.idCom) || this.idCom === null ||
                isNaN(this.idUser) || this.idUser === null ||
                isNaN(this.idFilm) || this.idFilm === null ||
                !this.message || this.message.trim() === "" ||
                !this.dateCom || this.dateCom.trim() === ""
            ) {
                throw new Error("Todos os campos devem ser preenchidos e os IDs devem ser números válidos.");
            }

            const { db, client } = await connect();
            const result = await db.collection("comentarios").insertOne({
                idCom: this.idCom,
                idUser: this.idUser,
                idFilm: this.idFilm,
                message: this.message,
                dateCom: this.dateCom,
            });
            console.log("Comentario inserido:", result.insertedId);
            client.close();
        } catch (error) {
            console.log("Erro ao inserir comentário:", error.message);
        }
    }

    static async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("comentarios").updateMany(filtro, { $set: novosDados });
            console.log("Comentarios atualizados: ", result.modifiedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao atualizar comentario! " + error);
        }
    }

    static async buscar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const comentario = await db.collection("comentarios").find(filtro).toArray();
            console.log("Comentarios encontrados!", comentario);
            client.close();
        } catch (error) {
            Logger.log("Erro ao buscar comentario! " + error);
        }
    }

    static async deletar(filtro) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("comentarios").deleteMany(filtro);
            console.log("Comentarios deletados com sucesso!", result.deletedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao deletar comentario " + error);
        }
    }
}

module.exports = Comentario;
