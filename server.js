const JsonDb = require('./db/db.js');
const express = require('express');
const app = express();
const PORT = process.env.PORT||3001; // has to use process.env because Heroku

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

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

app.post('/api/notes', async (req, res)=>{
    try {
        jsondb.create(req.body.title, req.body.text);
        await jsondb.commit();
        res.status(201).json({message: 'save to db successfully!'});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        if (jsondb.delete(id)) {
            await jsondb.commit();
            res.status(201).json({message: `delete item id ${id} successfully!`});
        } else {
            res.status(404).json({message: `didn't found item id ${id}!`});
        }
    } catch(err) {
        res.status(500).json({message: err.message});
    }
})

// get * should be the last route
app.get('*', (req, res)=>{
    res.sendFile(`${__dirname}/public/index.html`);
})

app.listen(PORT, ()=>{
    console.log(`nodejs server start listening on port ${PORT}`);
})