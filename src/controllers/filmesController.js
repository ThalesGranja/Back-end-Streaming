const { connect } = require("../models/db");
const Logger = require("../middlewares/logger");

class Filme {
    constructor(idFilm, nameFilm, leng, gen, classif, desc) {
        this.idFilm = Number(idFilm); // Converte para número
        this.nameFilm = nameFilm;
        this.leng = leng;
        this.gen = gen;
        this.classif = classif;
        this.desc = desc;
    }

    async inserir() {
        try {
            // Validação dos campos
            if (
                isNaN(this.idFilm) || this.idFilm === null ||
                !this.nameFilm || this.nameFilm.trim() === "" ||
                !this.leng || this.leng.trim() === "" ||
                !this.gen || this.gen.trim() === "" ||
                !this.classif || this.classif.trim() === "" ||
                !this.desc || this.desc.trim() === ""
            ) {
                throw new Error("Todos os campos devem ser preenchidos e o ID deve ser um número válido.");
            }

            const { db, client } = await connect();
            const result = await db.collection("filmes").insertOne({
                idFilm: this.idFilm,
                nameFilm: this.nameFilm,
                leng: this.leng,
                gen: this.gen,
                classif: this.classif,
                desc: this.desc,
            });
            console.log("Filme inserido:", result.insertedId);
            client.close();
        } catch (error) {
            console.log("Erro ao inserir filme:", error.message);
        }
    }

    static async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("filmes").updateMany(filtro, { $set: novosDados });
            console.log("Filmes atualizados: ", result.modifiedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao atualizar filme! " + error);
        }
    }

    static async buscar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const filme = await db.collection("filmes").find(filtro).toArray();
            console.log("Filmes encontrados!", filme);
            client.close();
        } catch (error) {
            Logger.log("Erro ao buscar filme! " + error);
        }
    }

    static async deletar(filtro) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("filmes").deleteMany(filtro); // Corrigido: era 'usuarios'
            console.log("Filmes deletados com sucesso!", result.deletedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao deletar filme " + error);
        }
    }
}

module.exports = Filme;
