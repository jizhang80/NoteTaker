const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res)=>{
    res.sendFile(`${__dirname}/public/notes.html`);
})

app.listen(PORT, ()=>{
    console.log(`nodejs server start listening on port ${PORT}`);
})