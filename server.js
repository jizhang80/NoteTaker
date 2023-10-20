const JsonDb = require('./db/db.js');
const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));

//init db
const jsondb = new JsonDb();

// routers
app.get('/notes', (req, res)=>{
    res.sendFile(`${__dirname}/public/notes.html`);
})

// api routers
app.get('/api/notes', (req, res)=>{
    res.json(jsondb.getAll());
})

app.post('/api/notes', (req, res)=>{
    jsondb.create(req.body.title, req.body.text);
    jsondb.commit();
})

// get * should be the last route
app.get('*', (req, res)=>{
    res.sendFile(`${__dirname}/public/index.html`);
})

app.listen(PORT, ()=>{
    console.log(`nodejs server start listening on port ${PORT}`);
})