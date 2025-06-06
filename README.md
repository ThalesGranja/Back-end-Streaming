# Projeto 1 - Back-end de Plataforma de Streaming

Este é um projeto de back-end para uma aplicação de streaming, desenvolvido com Node.js e MongoDB. O sistema oferece funcionalidades como gerenciamento de usuários, filmes e comentários.

## 1. Como rodar o projeto localmente

Siga os passos abaixo para rodar o projeto em sua máquina local:

### 1.1 Clone o repositório

```bash
git clone https://github.com/ThalesGranja/Back-end-Streaming.git
```

### 1.2 Instale as dependências

```bash
npm install
```

### 1.3 Configure o banco de dados

Este projeto utiliza o MongoDB. Um backup do banco de dados está incluído no diretório `backup-streaming`. Para restaurar o banco em sua instância local do MongoDB:

```bash
mongorestore --db streaming ./backup-streaming
```

Certifique-se de que o MongoDB está em execução localmente (`mongodb://localhost:27017`).

### 1.4 Inicie a aplicação

```bash
node app.js
```

A aplicação estará rodando por padrão em `http://localhost:3000`.


## 2. Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)


## 3. Funcionalidades do Sistema

- Cadastro e autenticação de usuários
- Adição, listagem e exclusão de filmes
- Sistema de comentários para os filmes
- Logs de acesso e requisições
- Backup do banco de dados incluso


## 4. Autor

**Thales H. de A. Granja**  
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ThalesGranja)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/thales-granja/)

---

### Licença

Este projeto está licenciado sob a Licença MIT. Sinta-se livre para usá-lo e modificá-lo conforme necessário.
