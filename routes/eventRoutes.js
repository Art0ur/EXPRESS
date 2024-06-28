const express = require('express');
const router = express.Router();

// Exemplo de rota para criar um evento
router.post('/', async (req, res) => {
    try {
        const event = req.body;
        const db = req.db;
        const docRef = await db.collection('events').add(event);
        res.status(201).json({ id: docRef.id });
    } catch (error) {
        res.status(500).send('Erro ao criar evento: ' + error.message);
    }
});

// Exemplo de rota para obter todos os eventos
router.get('/', async (req, res) => {
    try {
        const db = req.db;
        const snapshot = await db.collection('events').get();
        const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(events);
    } catch (error) {
        res.status(500).send('Erro ao obter eventos: ' + error.message);
    }
});

module.exports = router;
