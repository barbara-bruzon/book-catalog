const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const uri = 'mongodb://localhost:27017';
const dbName = 'livros';

app.use(
    cors({
        origin: "http://localhost:8080",
    })
);
app.use(express.json());

async function connection() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Conexão realizada!");
        const db = client.db(dbName);
        return db;
    } catch (error) {
        console.error("Erro na conexão:", error);
        throw error;
    }
}

// Routes
app.get("/livros/:page", async (req, res) => {
    const page = parseInt(req.params.page);
    const skip = (page - 1) * 10;
    try {
        const db = await connection();
        const collection = db.collection('livro');
        const books = await collection.find({}).skip(skip).limit(10).toArray();
        res.json(books);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os dados dos livros:", error);
        res.status(500).json({ error: "Erro ao buscar livros" });
    }
});

app.get("/len", async (req, res) => {
    try {
        const db = await connection();
        const collection = db.collection('livro');
        const amount = await collection.countDocuments();
        res.json({ amount });
    } catch (error) {
        console.error("Ocorreu um erro ao contar os documentos:", error);
        res.status(500).json({
            error: "Ocorreu um erro ao contar os documentos",
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});