const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Статика (всі HTML/CSS/JS із попереднього public)
app.use(express.static(path.join(__dirname, 'public')));

// ====== Дані користувачів ======
const users = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    firstname: `User${i+1}`,
    lastname: `Last${i+1}`,
    score: Math.floor(Math.random() * 101)
}));

// ====== Погодні дані ======
let currentTemperature = Math.floor(Math.random() * 31);

// ====== API fetchUsers ======
app.get('/api/fetchUsers', (req, res) => {
    let selected = [...users].sort(() => 0.5 - Math.random()).slice(0, 10);
    
    const { sortBy, order } = req.query; // sortBy=firstname|lastname, order=asc|desc
    if (sortBy && (sortBy === 'firstname' || sortBy === 'lastname')) {
        selected.sort((a, b) => {
            const cmp = a[sortBy].localeCompare(b[sortBy]);
            return order === 'desc' ? -cmp : cmp;
        });
    }

    setTimeout(() => res.json(selected), 1000); // імітуємо затримку 1 сек
});

// ====== API getNewUsers ======
app.get('/api/getNewUsers', (req, res) => {
    res.json(users.slice(0, 5));
});

// ====== API gallery ======
app.get('/api/gallery', (req, res) => {ф
    const galleryDir = path.join(__dirname, 'public', 'gallery');
    fs.readdir(galleryDir, (err, files) => {
        if (err) return res.status(500).json({ error: 'Cannot read gallery' });
        const images = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
        res.json(images);
    });
});

// ====== API weather ======
app.get('/api/weather', (req, res) => {
    currentTemperature = Math.floor(Math.random() * 31); // нова випадкова температура
    res.json({ city: 'Kyiv', temperature: currentTemperature });
});

// ====== Запуск сервера ======
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});