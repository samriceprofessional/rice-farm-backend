const express = require('express');
const animalRoutes = require('./src/animal/routes.js');
var cors = require('cors');

const app = express();


app.use(cors());
const port = 3000;


app.use(express.json());
app.get("/", (req, res)=>{
    res.send("Hello World!");
});

app.use('/api/v1/animal', animalRoutes );
app.listen(port, ()=> console.log(`app listening on port ${port}`));